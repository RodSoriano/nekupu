import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseEntity } from '../../common/entities/base-entity.entity';
import { Message } from '../../message/entities/message.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class ChatRoom extends BaseEntity {
  @OneToMany(() => Message, (message) => message.chatRoom)
  messages: Message[];

  @OneToOne(() => User, (user) => user.chatRoom)
  @JoinColumn()
  user: User;
}
