import { ConfigModule } from '@nestjs/config';
import InitSeeder from 'database/seeder/init.seeder';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { typeOrmConfiguration } from './typeorm.config';

ConfigModule.forRoot({
  envFilePath: '.env',
});

export const typeOrmConfigurationForSeeder: DataSourceOptions & SeederOptions =
  {
    ...typeOrmConfiguration,
    seeds: [InitSeeder],
  };

const dataSource = new DataSource(typeOrmConfigurationForSeeder);

export default dataSource;
