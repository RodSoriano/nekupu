import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Post } from '../../post/entities/post.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Post)
  @JoinTable({
    name: 'category_posts',
    joinColumn: {
      name: 'category',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'post',
      referencedColumnName: 'id',
    },
  })
  posts: Post[];
}
