import { Injectable } from '@nestjs/common';

import { ChatRoom } from '../chat-room/entities/chat-room.entity';
import { ChatRoomService } from '../chat-room/chat-room.service';
import { Message } from '../message/entities/message.entity';
import { MessageService } from '../message/message.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRoomService: ChatRoomService,
    private readonly messageService: MessageService,
  ) {}

  async createChatRoomByUserId(userId: number): Promise<void> {
    await this.chatRoomService.create(userId);
  }

  async findAllChatRooms(): Promise<ChatRoom[]> {
    return await this.chatRoomService.findAll();
  }

  async findChatRoomById(chatRoomId: number): Promise<ChatRoom> {
    return await this.chatRoomService.findById(chatRoomId);
  }

  async findAllMessagesByChatRoomId(id: number): Promise<Message[]> {
    const chatRoom = await this.findChatRoomById(id);
    const messages = await this.messageService.findAllByChatRoom(chatRoom);

    return messages;
  }

  async findChatRoomByUserId(id: number): Promise<ChatRoom> {
    const messages = await this.chatRoomService.findByUserId(id);

    return messages;
  }

  async createMessageByChatRoomId(
    message: string,
    chatRoomId: number,
  ): Promise<Message> {
    const chatRoom = await this.findChatRoomById(chatRoomId);

    return await this.messageService.create(message, chatRoom);
  }

  async deleteChatRoomById(chatRoomId: number): Promise<void> {
    await this.chatRoomService.delete(chatRoomId);
  }
}
