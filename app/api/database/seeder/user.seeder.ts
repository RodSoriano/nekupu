import { DataSource } from 'typeorm';
import { hash } from 'bcrypt';

import { User } from '../../src/user/entities/user.entity';
import { userFactory } from '../factories/user.factory';

export const userSeeder = async (
  dataSource: DataSource,
  amountToGenerate: number,
) => {
  if (!dataSource.isInitialized) {
    console.error('DataSource is not initialized');
    return;
  }

  const repository = dataSource.getRepository(User);

  const adminData: Partial<User> = {
    firstName: 'admin',
    lastName: 'user',
    password: await hash('admin', 10),
    email: 'admin.user@email.com',
  };

  const existingUser = await repository.findOneBy({ email: adminData.email });

  // Insert only one record with this username.
  if (!existingUser) {
    await repository.insert([adminData]);
  }

  // Insert many records in database.
  const users = await userFactory().getMany(amountToGenerate);
  await repository.save(users);
};
