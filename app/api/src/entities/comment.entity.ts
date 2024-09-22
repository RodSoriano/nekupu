import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  commentableId: number;

  @Column()
  commentableType: string;
}
