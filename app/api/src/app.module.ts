import { join } from 'path';

import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { typeOrmConfiguration } from 'database/config/typeorm.config';
import { JoiValidationSchema } from './config/joi-validation.config';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { ContactModule } from './contact/contact.module';
import { MessageModule } from './message/message.module';
import { envConfiguration } from './config/env.config';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    // ConfigModule loads environment configurations and validates them with Joi schema
    ConfigModule.forRoot({
      load: [envConfiguration], // Custom configuration loader function
      validationSchema: JoiValidationSchema, // Schema for validating environment variables
    }),

    // ServeStaticModule serves the Angular frontend from the specified path
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', 'frontend/dist/frontend/browser'), // Path to the frontend build output
    }),

    // TypeOrmModule configures TypeORM with MySQL database connection
    TypeOrmModule.forRoot(typeOrmConfiguration),

    // ThrottlerModule configures rate-limiting to prevent abuse of the API
    ThrottlerModule.forRoot([
      {
        ttl: 900000, // Time to live for rate limiting (15 minutes in milliseconds)
        limit: 100, // Maximum number of requests allowed within the TTL per IP address
      },
    ]),
    UserModule,
    CategoryModule,
    CommentModule,
    ContactModule,
    MessageModule,
    PostModule,
    ChatRoomModule,
    ChatModule,
  ],

  // Declare the controller responsible for handling incoming requests
  controllers: [AppController],

  // Define the services and guards that should be provided in the application
  providers: [
    AppService,
    {
      provide: APP_GUARD, // Registers a global guard
      useClass: ThrottlerGuard, // Applies the ThrottlerGuard globally to enforce rate limiting
    },
  ],
})
export class AppModule {}
