import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CommentTypes } from '../enums/comment-type.enum';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  commentableId: number;

  @Column()
  commentableType: CommentTypes;
}
