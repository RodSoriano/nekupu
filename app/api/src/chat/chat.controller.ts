import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { ChatRoom } from '../chat-room/entities/chat-room.entity';
import { Message } from '../message/entities/message.entity';
import { CreateChatRoomDto } from './dto/create-chat.dto';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/chat-room/create')
  @HttpCode(HttpStatus.CREATED)
  async createChatRoomByUserId(@Body() userId: CreateChatRoomDto) {
    await this.chatService.createChatRoomByUserId(userId.userId);
  }

  @Get('/chat-room')
  @HttpCode(HttpStatus.OK)
  async findAllChatRooms(): Promise<ChatRoom[]> {
    return await this.chatService.findAllChatRooms();
  }

  @Get('/chat-room/:id/message')
  @HttpCode(HttpStatus.OK)
  async findAllMessagesByChatRoomId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Message[]> {
    return await this.chatService.findAllMessagesByChatRoomId(id);
  }

  @Get('/chat-room/user/:id')
  @HttpCode(HttpStatus.OK)
  async findChatRoomByUserId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ChatRoom> {
    return await this.chatService.findChatRoomByUserId(id);
  }
}
