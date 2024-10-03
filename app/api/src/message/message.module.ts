import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Message } from './entities/message.entity';
import { MessageService } from './message.service';

@Module({
  exports: [MessageService],
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageService],
})
export class MessageModule {}
