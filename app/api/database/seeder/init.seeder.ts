import userFactory from '../factories/user.factory';
import { DataSource } from 'typeorm';
import { Seeder, runSeeders } from 'typeorm-extension';
import UserSeeder from './user.seeder';
import CategorySeeder from './category.seeder';
import categoryFactory from 'database/factories/category.factory';

export default class InitSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [UserSeeder, CategorySeeder],
      factories: [userFactory, categoryFactory],
    });
  }
}
