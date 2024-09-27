import { faker } from '@faker-js/faker';

import { Category } from '../../src/category/entities/category.entity';
import { Post } from '../../src/post/entities/post.entity';
import { User } from '../../src/user/entities/user.entity';

export function postFactory(user: User, categories: Category[]) {
  return {
    run(): Post {
      const post = new Post();
      const randomCategories = faker.helpers.arrayElements(
        categories,
        getRandomIndex(categories),
      );

      post.categories = randomCategories;
      post.content = faker.lorem.paragraph(3);
      post.title = faker.lorem.sentence();
      post.user = user;

      return post;
    },
    getMany(amountToGenerate: number): Post[] {
      const posts: Post[] = [];
      for (let index = 0; index < amountToGenerate; index++) {
        posts.push(this.run());
      }
      return posts;
    },
    getOne(): Post {
      return this.run();
    },
  };
}

function getRandomIndex<T>(array: T[]): number {
  const maxIndex = array.length - 1;
  return Math.floor(Math.random() * (maxIndex + 1));
}
