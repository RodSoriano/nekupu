import { chatRoomSeeder } from './chat-room.seeder';
import { categorySeeder } from './category.seeder';
import dataSource from '../config/typeorm.config';
import { commentSeeder } from './comment.seeder';
import { contactSeeder } from './contact.seeder';
import { postSeeder } from './post.seeder';
import { userSeeder } from './user.seeder';
import { messageSeeder } from './message.seeder';

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

  // ChatRooms
  // the chat rooms to create has to be less or equal to
  // the number of users
  const chatRoomsToCreate = 10;
  await chatRoomSeeder(dataSource, chatRoomsToCreate);

  // Messages
  const messagesToCreate = 10;
  await messageSeeder(dataSource, messagesToCreate);

  await dataSource.destroy();
  console.log('Seed completed! 🎉');
};

initSeeder();
