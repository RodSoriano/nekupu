import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChatRoom } from './entities/chat-room.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepository: Repository<ChatRoom>,
    private readonly userService: UserService,
  ) {}

  // Temporal creation logic of chat room, this will be the created with an authenticaded user
  async create(userId: number): Promise<ChatRoom> {
    const user = await this.userService.findById(userId);
    console.log(user);

    const chatRoom = await this.chatRoomRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });

    console.log(chatRoom);

    if (chatRoom) {
      throw new BadRequestException(
        'There is an existing chat room for this user',
      );
    }

    return this.chatRoomRepository.save({
      user,
    });
  }

  async findAll(): Promise<ChatRoom[]> {
    const chatRooms = await this.chatRoomRepository.find();
    return chatRooms;
  }

  async findById(id: number): Promise<ChatRoom> {
    const chatRoom = await this.chatRoomRepository.findOneBy({ id });

    if (!chatRoom) {
      throw new NotFoundException(`Chat room with id ${id} was not found`);
    }

    return chatRoom;
  }

  async findByUserId(id: number): Promise<ChatRoom> {
    const chatRoom = await this.chatRoomRepository.findOne({
      where: {
        user: { id },
      },
    });

    if (!chatRoom) {
      throw new NotFoundException(`Chat room with user id ${id} was not found`);
    }

    return chatRoom;
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.chatRoomRepository.delete(id);
  }
}
