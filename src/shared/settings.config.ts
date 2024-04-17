import config from 'config';

export const settings = {
  db: {
    host: config.get<string>('db.host'),
    port: config.get<number>('db.port'),
    username: config.get<string>('db.username'),
    password: config.get<string>('db.password'),
    database: config.get<string>('db.database'),
    logger:
      config.get<
        ('log' | 'info' | 'warn' | 'query' | 'schema' | 'error' | 'migration')[]
      >('db.logger'),
    ssl: config.get<boolean>('db.ssl'),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extra: config.get<any>('db.extra'),
    synchronize: config.get<boolean>('db.synchronize'),
  },
  swagger: config.get<boolean>('swagger'),
};
