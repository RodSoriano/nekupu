import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Contact } from '../../contact/entities/contact.entity';
import { Post } from '../../post/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  picture: string;

  @Column()
  active: boolean;

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
