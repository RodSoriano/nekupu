import { DataSource } from 'typeorm';

import { Category } from '../../src/category/entities/category.entity';
import { categoryFactory } from '../factories/category.factory';

export const categorySeeder = async (
  dataSource: DataSource,
  amountToGenerate: number,
) => {
  const repository = dataSource.getRepository(Category);

  for (let i = 0; i < amountToGenerate; ) {
    // Generate a new category
    const newCategory = categoryFactory().getOne();

    // Check if it already exists in the database or in the generated data
    const existingCategory = await repository.findOneBy({
      name: newCategory.name, // Assuming the name must be unique
    });

    if (!existingCategory) {
      // If it doesn't exist, add it to the database
      await repository.save(newCategory);

      i++; // Increment i only when a category is successfully generated
    }
  }
};
