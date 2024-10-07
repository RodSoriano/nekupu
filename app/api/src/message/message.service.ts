import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ChatRoom } from '../chat-room/entities/chat-room.entity';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(message: string, chatRoom: ChatRoom): Promise<Message> {
    return await this.messageRepository.save({
      content: message,
      chatRoom,
    });
  }

  async findAllByChatRoom(chatRoom: ChatRoom): Promise<Message[]> {
    const messages = await this.messageRepository.find({
      where: {
        chatRoom,
      },
      take: 200,
      order: {
        id: 'DESC',
      },
    });

    return messages;
  }
}
