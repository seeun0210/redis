import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'cluster',
      nodes: [{ host: '192.168.194.239', port: 6379 }],
      options: {
        enableReadyCheck: false,
        retryDelayOnFailover: 50,
        enableOfflineQueue: true,
        scaleReads: 'slave',
        lazyConnect: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
