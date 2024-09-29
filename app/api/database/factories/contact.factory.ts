import { faker } from '@faker-js/faker';

import { Contact } from '../../src/contact/entities/contact.entity';
import { User } from '../../src/user/entities/user.entity';

export function contactFactory(user: User) {
  return {
    run(): Contact {
      const contact = new Contact();

      contact.fullName = faker.person.fullName();
      contact.country = faker.location.countryCode('alpha-2');
      contact.email = faker.internet.email();
      contact.phone = faker.phone.number({
        style: 'international',
      });
      contact.user = user;

      return contact;
    },
    getMany(amountToGenerate: number): Contact[] {
      const contacts: Contact[] = [];
      for (let index = 0; index < amountToGenerate; index++) {
        contacts.push(this.run());
      }
      return contacts;
    },
    getOne(): Contact {
      return this.run();
    },
  };
}
