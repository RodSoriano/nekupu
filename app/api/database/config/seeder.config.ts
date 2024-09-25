import { ConfigModule } from '@nestjs/config';
import InitSeeder from 'database/seeder/init.seeder';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { typeOrmConfiguration } from './typeorm.config';

ConfigModule.forRoot({
  envFilePath: '.env',
});

export const typeOrmConfigurationForSeeder = {
  ...typeOrmConfiguration,
  seeds: [InitSeeder],
};

const dataSource = new DataSource(
  typeOrmConfigurationForSeeder as DataSourceOptions & SeederOptions,
);

export default dataSource;
