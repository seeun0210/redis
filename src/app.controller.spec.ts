import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from '@nestjs-modules/ioredis';

describe('AppController', () => {
  let appController: AppController;
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
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
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
