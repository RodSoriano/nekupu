import dataSource from '../config/typeorm.config';
import { userSeeder } from './user.seeder';

const initSeeder = async (): Promise<void> => {
  await dataSource.initialize();

  const usersToCreate = 40;
  await userSeeder(dataSource, usersToCreate);

  await dataSource.destroy();
  console.log('Seed completed! 🎉');
};

initSeeder();
