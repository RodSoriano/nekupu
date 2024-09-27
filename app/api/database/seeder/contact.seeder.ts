import { DataSource } from 'typeorm';

import { User } from '../../src/user/entities/user.entity';
import { Contact } from '../../src/contact/entities/contact.entity';
import { contactFactory } from '../factories/contact.factory';

export const contactSeeder = async (
  dataSource: DataSource,
  amountToGenerate: number,
) => {
  const contactsPromises: Promise<Contact[]>[] = [];

  if (!dataSource.isInitialized) {
    console.error('DataSource is not initialized');
    return;
  }

  const userRepository = dataSource.getRepository(User);
  const contactRepository = dataSource.getRepository(Contact);

  const users = await userRepository.find();

  for (const user of users) {
    const contacts = contactFactory(user).getMany(amountToGenerate);
    contactsPromises.push(contactRepository.save(contacts));
  }

  await Promise.all(contactsPromises);
};
