import { ConnectionOptions } from 'typeorm';

export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'apiNews',
  autoLoadEntities: true,
  synchronize: false,
  migrationsRun: false,
  migrations: ['dist/database/migrations/**/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  // [path for app, path for migrations from root of server package]
  entities: [
    'modules/**/entities/*.entity.ts',
    'dist/modules/**/entities/*.entity{ .ts,.js}',
  ],
} as unknown as ConnectionOptions;
