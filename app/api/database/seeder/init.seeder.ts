import dataSource from '../config/typeorm.config';
import { categorySeeder } from './category.seeder';
import { userSeeder } from './user.seeder';

const initSeeder = async (): Promise<void> => {
  await dataSource.initialize();

  // Users
  const usersToCreate = 40;
  await userSeeder(dataSource, usersToCreate);

  // Categories
  const categoriesToCreate = 12;
  await categorySeeder(dataSource, categoriesToCreate);

  await dataSource.destroy();
  console.log('Seed completed! 🎉');
};

initSeeder();
