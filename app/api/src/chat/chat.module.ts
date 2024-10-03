import { Module } from '@nestjs/common';

import { ChatRoomModule } from 'src/chat-room/chat-room.module';
import { MessageModule } from 'src/message/message.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  controllers: [ChatController],
  imports: [ChatRoomModule, MessageModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
