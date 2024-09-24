import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

import { Post } from '../../post/entities/post.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Post)
  posts: Post[];
}
