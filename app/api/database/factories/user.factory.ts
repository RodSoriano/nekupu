import { hash } from 'bcrypt';
import { User } from '../../src/user/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(User, async (faker) => {
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
});
