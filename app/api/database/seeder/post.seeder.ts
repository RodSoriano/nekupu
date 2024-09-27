import { DataSource } from 'typeorm';

import { Category } from '../../src/category/entities/category.entity';
import { Post } from '../../src/post/entities/post.entity';
import { User } from '../../src/user/entities/user.entity';
import { postFactory } from '../factories/post.factory';

export const postSeeder = async (
  dataSource: DataSource,
  amountToGenerate: number,
) => {
  const postsPromises: Promise<Post[]>[] = [];

  if (!dataSource.isInitialized) {
    console.error('DataSource is not initialized');
    return;
  }

  const userRepository = dataSource.getRepository(User);
  const postRepository = dataSource.getRepository(Post);
  const categoryRepository = dataSource.getRepository(Category);

  const users = await userRepository.find();
  const categories = await categoryRepository.find();

  for (const user of users) {
    const posts = postFactory(user, categories).getMany(amountToGenerate);
    postsPromises.push(postRepository.save(posts));
  }

  await Promise.all(postsPromises);
};
