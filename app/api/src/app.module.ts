import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { JoiValidationSchema } from './config/joi-validation.config';
import { envConfiguration } from './config/env.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';

@Module({
  imports: [
    // ConfigModule loads environment configurations and validates them with Joi schema
    ConfigModule.forRoot({
      load: [envConfiguration], // Custom configuration loader function
      validationSchema: JoiValidationSchema, // Schema for validating environment variables
    }),

    // ServeStaticModule serves the Angular frontend from the specified path
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'frontend/dist/frontend/browser'), // Path to the frontend build output
    }),

    // TypeOrmModule configures TypeORM with MySQL database connection
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOSTNAME,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),

    // ThrottlerModule configures rate-limiting to prevent abuse of the API
    ThrottlerModule.forRoot([
      {
        ttl: 900000, // Time to live for rate limiting (15 minutes in milliseconds)
        limit: 100, // Maximum number of requests allowed within the TTL per IP address
      },
    ]),
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
