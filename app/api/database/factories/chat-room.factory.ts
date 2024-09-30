import { ChatRoom } from '../../src/chat-room/entities/chat-room.entity';
import { User } from '../../src/user/entities/user.entity';

export function chatRoomFactory(user: User) {
  return {
    run(): ChatRoom {
      const chatRoom = new ChatRoom();

      chatRoom.user = user;

      return chatRoom;
    },
    getMany(amountToGenerate: number): ChatRoom[] {
      const posts: ChatRoom[] = [];
      for (let index = 0; index < amountToGenerate; index++) {
        posts.push(this.run());
      }
      return posts;
    },
    getOne(): ChatRoom {
      return this.run();
    },
  };
}
