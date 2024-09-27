import { Entity, Column } from 'typeorm';

import { BaseEntity } from '../../common/entities/base-entity.entity';
import { CommentTypes } from '../enums/comment-type.enum';

@Entity()
export class Comment extends BaseEntity {
  @Column('varchar', {
    nullable: false,
  })
  content: string;

  @Column('int', {
    nullable: false,
  })
  commentableId: number;

  @Column('varchar', {
    nullable: false,
  })
  commentableType: CommentTypes;
}
