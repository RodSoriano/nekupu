import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  active: boolean;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToMany(() => Category)
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
  categories: Category[];
}
