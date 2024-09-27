import { categorySeeder } from './category.seeder';
import dataSource from '../config/typeorm.config';
import { commentSeeder } from './comment.seeder';
import { postSeeder } from './post.seeder';
import { userSeeder } from './user.seeder';

const initSeeder = async (): Promise<void> => {
  await dataSource.initialize();

  // Users
  const usersToCreate = 40;
  await userSeeder(dataSource, usersToCreate);

  // Categories
  const categoriesToCreate = 12;
  await categorySeeder(dataSource, categoriesToCreate);

  // Post
  const postsToCreate = 10;
  await postSeeder(dataSource, postsToCreate);

  // Comment
  const commentsToCreate = 10;
  await commentSeeder(dataSource, commentsToCreate);

  await dataSource.destroy();
  console.log('Seed completed! 🎉');
};

initSeeder();
