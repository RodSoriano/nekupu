import { Category } from '../../src/category/entities/category.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Category, async (faker) => {
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
});
