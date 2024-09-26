import { hash } from 'bcrypt';
import { User } from '../../src/user/entities/user.entity';
import { DataSource } from 'typeorm';

import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(User);
    const itemsToBeGenerated = 40;

    const data: Partial<User> = {
      firstName: 'admin',
      lastName: 'user',
      password: await hash('admin', 10),
      email: 'admin.user@email.com',
    };

    const user = await repository.findOneBy({ email: data.email });

    // Insert only one record with this username.
    if (!user) {
      await repository.insert([data]);
    }

    // ---------------------------------------------------

    const userFactory = factoryManager.get(User);

    // Insert only one record.
    // await userFactory.save();

    // Insert many records in database.
    await userFactory.saveMany(itemsToBeGenerated);
  }
}
