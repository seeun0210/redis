import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'cluster',
      nodes: [
        { host: '127.0.0.1', port: 7000 },
        { host: '127.0.0.1', port: 7001 },
        { host: '127.0.0.1', port: 7002 },
        { host: '127.0.0.1', port: 7003 },
        { host: '127.0.0.1', port: 7004 },
        { host: '127.0.0.1', port: 7005 },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
