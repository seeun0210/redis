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
          nodes: [
            { host: 'redis-cluster-0.redis-cluster-headless', port: 6379 },
            { host: 'redis-cluster-1.redis-cluster-headless', port: 6379 },
            { host: 'redis-cluster-2.redis-cluster-headless', port: 6379 },
            { host: 'redis-cluster-3.redis-cluster-headless', port: 6379 },
            { host: 'redis-cluster-4.redis-cluster-headless', port: 6379 },
            { host: 'redis-cluster-5.redis-cluster-headless', port: 6379 },
          ],
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
