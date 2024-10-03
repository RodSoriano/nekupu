import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket, Server } from 'socket.io';
import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';

import { JoinChatRoomDtoWs, MessagePayloadDtoWs } from './dto/create-chat.dto';
import { BadRequestTransformation } from './filters/bad-request-transformation.filter';

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
    client: Socket,
    payload: MessagePayloadDtoWs,
  ): Promise<void> {
    const messageCreated = await this.chatService.createMessageByChatRoomId(
      payload.message,
      payload.chatRoomId,
    );

    this.server.to(`chatRoom_${payload.chatRoomId}`).emit('message', {
      message: messageCreated.content,
    });
  }
}
