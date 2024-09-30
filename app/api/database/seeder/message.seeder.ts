import { DataSource } from 'typeorm';

import { ChatRoom } from '../../src/chat-room/entities/chat-room.entity';
import { Message } from '../../src/message/entities/message.entity';
import { messageFactory } from '../factories/message.factory';

export const messageSeeder = async (
  dataSource: DataSource,
  amountToGenerate: number,
) => {
  const messagePromises: Promise<Message[]>[] = [];

  if (!dataSource.isInitialized) {
    console.error('DataSource is not initialized');
    return;
  }

  const chatRoomRepository = dataSource.getRepository(ChatRoom);
  const messageRepository = dataSource.getRepository(Message);

  const chatRooms = await chatRoomRepository.find();

  for (const chatRoom of chatRooms) {
    const messages = messageFactory(chatRoom).getMany(amountToGenerate);
    messagePromises.push(messageRepository.save(messages));
  }

  await Promise.all(messagePromises);
};
