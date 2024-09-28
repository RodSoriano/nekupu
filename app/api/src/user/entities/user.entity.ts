import { Entity, Column, OneToMany, OneToOne } from 'typeorm';

import { BaseEntity } from '../../common/entities/base-entity.entity';
import { ChatRoom } from '../../chat-room/entities/chat-room.entity';
import { Contact } from '../../contact/entities/contact.entity';
import { Post } from '../../post/entities/post.entity';

@Entity()
export class User extends BaseEntity {
  @Column('varchar', {
    nullable: false,
  })
  firstName: string;

  @Column('varchar', {
    nullable: false,
  })
  lastName: string;

  @Column('varchar', {
    nullable: false,
  })
  email: string;

  @Column('varchar', {
    nullable: false,
  })
  password: string;

  @Column('varchar', {
    nullable: true,
  })
  picture: string;

  @Column({
    default: true,
  })
  active: boolean;

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToOne(() => ChatRoom, (chatRoom) => chatRoom.user)
  chatRoom: ChatRoom;
}
