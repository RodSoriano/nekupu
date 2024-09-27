import { Entity, Column, ManyToOne, JoinTable, ManyToMany } from 'typeorm';

import { BaseEntity } from '../../common/entities/base-entity.entity';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Post extends BaseEntity {
  @Column({
    default: true,
  })
  active: boolean;

  @Column('varchar', {
    nullable: true,
  })
  picture: string;

  @Column('varchar', {
    nullable: false,
  })
  title: string;

  @Column('varchar', {
    nullable: false,
  })
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
