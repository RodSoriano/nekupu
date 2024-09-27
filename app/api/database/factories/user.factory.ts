import { faker } from '@faker-js/faker';
import { hash } from 'bcrypt';

import { User } from '../../src/user/entities/user.entity';

export function userFactory() {
  return {
    async run(): Promise<User> {
      const user = new User();

      user.firstName = faker.person.firstName();
      user.lastName = faker.person.lastName();
      user.email = faker.internet.email({
        firstName: user.firstName,
        lastName: user.lastName,
      });
      user.password = await hash(faker.internet.password(), 10);
      user.active = true;

      return user;
    },
    async getMany(amountToGenerate: number): Promise<User[]> {
      const users: User[] = [];
      for (let index = 0; index < amountToGenerate; index++) {
        users.push(await this.run());
      }
      return users;
    },
  };
}
