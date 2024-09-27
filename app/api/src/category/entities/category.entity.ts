import { Entity, Column, ManyToMany } from 'typeorm';

import { BaseEntity } from '../../common/entities/base-entity.entity';
import { Post } from '../../post/entities/post.entity';

@Entity()
export class Category extends BaseEntity {
  @Column('varchar', {
    nullable: false,
  })
  name: string;

  @ManyToMany(() => Post)
  posts: Post[];
}
