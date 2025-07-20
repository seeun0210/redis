import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { RedisModule } from '@nestjs-modules/ioredis';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        RedisModule.forRoot({
          type: 'cluster',
          nodes: [{ host: '192.168.194.239', port: 6379 }],
          options: {
            enableReadyCheck: false,
            retryDelayOnFailover: 100,
            enableOfflineQueue: true,
            scaleReads: 'slave',
            lazyConnect: true,
          },
        }),
      ],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  // Redis 연결은 테스트 모듈이 자동으로 정리합니다

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(appService.getHello()).toBe('Hello World!');
    });
  });

  describe('Redis Operations', () => {
    it('should have Redis methods available', () => {
      expect(typeof appService.setKey).toBe('function');
      expect(typeof appService.getKey).toBe('function');
      expect(typeof appService.deleteKey).toBe('function');
    });

    it('should have cluster info methods available', () => {
      expect(typeof appService.getClusterInfo).toBe('function');
      expect(typeof appService.getClusterNodes).toBe('function');
    });
  });
});
