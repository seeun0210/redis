import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'cluster',
      nodes: [
        { host: 'redis-cluster-0.redis-cluster-headless', port: 6379 },
        { host: 'redis-cluster-1.redis-cluster-headless', port: 6379 },
        { host: 'redis-cluster-2.redis-cluster-headless', port: 6379 },
        { host: 'redis-cluster-3.redis-cluster-headless', port: 6379 },
        { host: 'redis-cluster-4.redis-cluster-headless', port: 6379 },
        { host: 'redis-cluster-5.redis-cluster-headless', port: 6379 },
      ],
      options: {
        enableReadyCheck: true,
        retryDelayOnFailover: 100,
        enableOfflineQueue: false,
        scaleReads: 'slave',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
