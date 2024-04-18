import { BlogspotModule } from './blogspot/blogspot.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from './shared/ormconfig';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    BlogspotModule,
    CacheModule.register({
      ttl: 300000,
      isGlobal: true,
      store: redisStore,
      host: 'earnlab_redis',
      port: 6379,
    }),
    TypeOrmModule.forRoot(connectionOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
