import { ConfigModule } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

ConfigModule.forRoot({
  envFilePath: '.env',
});

export const typeOrmConfiguration: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOSTNAME,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../../src/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(typeOrmConfiguration);

export default dataSource;
