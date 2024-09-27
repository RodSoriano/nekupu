import { faker } from '@faker-js/faker';

import { CommentTypes } from '../../src/comment/enums/comment-type.enum';
import { Comment } from '../../src/comment/entities/comment.entity';

export function commentFactory(id: number) {
  return {
    run(): Comment {
      const post = new Comment();

      post.commentableId = id;
      post.content = faker.lorem.paragraph(3);
      post.commentableType = CommentTypes.POST;

      return post;
    },
    getMany(amountToGenerate: number): Comment[] {
      const posts: Comment[] = [];
      for (let index = 0; index < amountToGenerate; index++) {
        posts.push(this.run());
      }
      return posts;
    },
    getOne(): Comment {
      return this.run();
    },
  };
}
