import { categorySeeder } from './category.seeder';
import dataSource from '../config/typeorm.config';
import { commentSeeder } from './comment.seeder';
import { postSeeder } from './post.seeder';
import { userSeeder } from './user.seeder';
import { contactSeeder } from './contact.seeder';

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

  // Contact
  const contactsToCreate = 10;
  await contactSeeder(dataSource, contactsToCreate);

  await dataSource.destroy();
  console.log('Seed completed! 🎉');
};

initSeeder();
