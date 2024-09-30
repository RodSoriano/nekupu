import { DataSource } from 'typeorm';

import { ChatRoom } from '../../src/chat-room/entities/chat-room.entity';
import { chatRoomFactory } from '../factories/chat-room.factory';
import { User } from '../../src/user/entities/user.entity';

export const chatRoomSeeder = async (
  dataSource: DataSource,
  amountToGenerate: number,
) => {
  const chatRoomPromises: Promise<ChatRoom>[] = [];

  if (!dataSource.isInitialized) {
    console.error('DataSource is not initialized');
    return;
  }

  const userRespository = dataSource.getRepository(User);
  const chatRoomRepository = dataSource.getRepository(ChatRoom);

  const users = await userRespository.find({
    take: amountToGenerate,
  });

  for (const user of users) {
    const chatRoom = chatRoomFactory(user).getOne();
    chatRoomPromises.push(chatRoomRepository.save(chatRoom));
  }

  await Promise.all(chatRoomPromises);
};
