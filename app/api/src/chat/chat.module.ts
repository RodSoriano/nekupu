import { Module } from '@nestjs/common';

import { ChatRoomModule } from '../chat-room/chat-room.module';
import { MessageModule } from '../message/message.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  controllers: [ChatController],
  imports: [ChatRoomModule, MessageModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
