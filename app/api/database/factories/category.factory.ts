import { faker } from '@faker-js/faker';

import { Category } from '../../src/category/entities/category.entity';

export function categoryFactory() {
  return {
    run(): Category {
      const category = new Category();

      const categories = [
        'Technology',
        'Health & Wellness',
        'Travel',
        'Education',
        'Lifestyle',
        'Business & Finance',
        'Entertainment',
        'Food & Drink',
        'Sports',
        'Environment',
        'Parenting & Family',
        'Art & Design',
      ];

      const categoryRandom = faker.helpers.arrayElement(categories);

      category.name = categoryRandom;

      return category;
    },
    getMany(amountToGenerate: number): Category[] {
      const categories: Category[] = [];
      for (let index = 0; index < amountToGenerate; index++) {
        categories.push(this.run());
      }
      return categories;
    },
    getOne(): Category {
      return this.run();
    },
  };
}
