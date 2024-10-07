import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

import {
  DeleteChatRoomWs,
  JoinChatRoomDtoWs,
  MessagePayloadDtoWs,
} from './dto/create-chat.dto';
import { BadRequestTransformation, NotFoundTransformation } from './filters';
import { ChatService } from './chat.service';

@UseFilters(new NotFoundTransformation())
@UseFilters(new BadRequestTransformation())
@UsePipes(new ValidationPipe({ transform: true }))
@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  readonly server: Server;

  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected ${client.id}`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`client connected ${client.id}`);
  }

  // Join to a specific chat room
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinChatRoomDtoWs,
  ): void {
    const { chatRoomId } = payload;

    this.logger.log(`chatRoomId ${chatRoomId}`);

    client.join(`chatRoom_${chatRoomId}`);
    client.emit('joinedRoom', { chatRoomId });
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: MessagePayloadDtoWs,
  ): Promise<void> {
    const messageCreated = await this.chatService.createMessageByChatRoomId(
      payload.message,
      payload.chatRoomId,
    );

    this.server.to(`chatRoom_${payload.chatRoomId}`).emit('message', {
      message: messageCreated.content,
    });
  }

  @SubscribeMessage('deleteRoom')
  async handleDeleteChatRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: DeleteChatRoomWs,
  ): Promise<void> {
    const { chatRoomId } = payload;

    this.logger.log(`Deleting chatRoomId ${chatRoomId}`);

    // Emit an event to all users in this chat room, informing them that it will be deleted
    this.server.to(`chatRoom_${chatRoomId}`).emit('roomDeleted', {
      chatRoomId,
      message: 'This chat room has been deleted.',
    });

    // Remove all users from the chat room
    this.server.socketsLeave(`chatRoom_${chatRoomId}`);

    // Deleteting chat room from db along with chats
    await this.chatService.deleteChatRoomById(chatRoomId);

    // Emit a confirmation to the client who requested the chat room deletion
    client.emit('roomDeletedConfirmation', {
      chatRoomId,
      message: `Chat room ${chatRoomId} has been successfully deleted.`,
    });
  }
}
