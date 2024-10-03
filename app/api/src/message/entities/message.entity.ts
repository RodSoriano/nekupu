import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../common/entities/base-entity.entity';
import { ChatRoom } from '../../chat-room/entities/chat-room.entity';

@Entity()
export class Message extends BaseEntity {
  @Column('text', {
    nullable: false,
  })
  content: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestamp: number;

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.messages, {
    onDelete: 'CASCADE',
  })
  chatRoom: ChatRoom;
}
