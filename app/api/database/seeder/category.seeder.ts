import { Category } from '../../src/category/entities/category.entity';
import { DataSource } from 'typeorm';

import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class CategorySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const categoryFactory = factoryManager.get(Category);
    const categoryRepository = dataSource.getRepository(Category);
    const itemsToBeGenerated = 12;

    const generatedCategories: string[] = [];

    for (let i = 0; i < itemsToBeGenerated; ) {
      // Generate a new category
      const newCategory = await categoryFactory.make();

      // Check if it already exists in the database or in the generated data
      const existingCategory = await categoryRepository.findOneBy({
        name: newCategory.name, // Assuming the name must be unique
      });

      if (
        !existingCategory &&
        !generatedCategories.includes(newCategory.name)
      ) {
        // If it doesn't exist, add it to both the database and the generated list
        await categoryFactory.save(newCategory);
        generatedCategories.push(newCategory.name); // Add to the generated list

        i++; // Increment i only when a category is successfully generated
      }
    }
  }
}
