import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { settings } from './settings.config';

export const connectionOptions: DataSourceOptions = {
  type: 'postgres',
  host: settings.db.host,
  port: settings.db.port,
  username: settings.db.username,
  password: settings.db.password,
  database: settings.db.database,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: settings.db.synchronize,
  maxQueryExecutionTime: 500,
  migrationsRun: false,
  namingStrategy: new SnakeNamingStrategy(),
  ssl: settings.db.ssl,
  extra: settings.db.extra,
};
