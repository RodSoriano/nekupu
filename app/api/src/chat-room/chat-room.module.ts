import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ChatRoom } from './entities/chat-room.entity';
import { ChatRoomService } from './chat-room.service';
import { UserModule } from '../user/user.module';

@Module({
  exports: [ChatRoomService],
  imports: [UserModule, TypeOrmModule.forFeature([ChatRoom])],
  providers: [ChatRoomService],
})
export class ChatRoomModule {}
