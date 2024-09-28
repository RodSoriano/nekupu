import { faker } from '@faker-js/faker';

import { ChatRoom } from '../../src/chat-room/entities/chat-room.entity';
import { Message } from '../../src/message/entities/message.entity';

export function messageFactory(chatRoom: ChatRoom) {
  return {
    run(): Message {
      const message = new Message();

      message.content = faker.lorem.paragraph(3);
      message.chatRoom = chatRoom;

      return message;
    },
    getMany(amountToGenerate: number): Message[] {
      const messages: Message[] = [];
      for (let index = 0; index < amountToGenerate; index++) {
        messages.push(this.run());
      }
      return messages;
    },
    getOne(): Message {
      return this.run();
    },
  };
}
