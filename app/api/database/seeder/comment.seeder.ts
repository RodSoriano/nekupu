import { DataSource } from 'typeorm';

import { Comment } from '../../src/comment/entities/comment.entity';
import { commentFactory } from '../factories/comment.factory';
import { Post } from '../../src/post/entities/post.entity';

export const commentSeeder = async (
  dataSource: DataSource,
  amountToGenerate: number,
) => {
  const commentsPromises: Promise<Comment[]>[] = [];

  if (!dataSource.isInitialized) {
    console.error('DataSource is not initialized');
    return;
  }

  const postRepository = dataSource.getRepository(Post);
  const commentRepository = dataSource.getRepository(Comment);

  const posts = await postRepository.find();

  for (const { id } of posts) {
    const comments = commentFactory(id).getMany(amountToGenerate);
    commentsPromises.push(commentRepository.save(comments));
  }

  await Promise.all(commentsPromises);
};
