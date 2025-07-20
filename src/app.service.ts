import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class AppService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  getHello(): string {
    return 'Hello World!';
  }

  async setKey(key: string, value: string): Promise<string> {
    await this.redis.set(key, value);
    return `Key ${key} set successfully`;
  }

  async getKey(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  async deleteKey(key: string): Promise<string> {
    const result = await this.redis.del(key);
    return `Key ${key} deleted. Deleted count: ${result}`;
  }

  async getClusterInfo(): Promise<string> {
    const info = await this.redis.cluster('INFO');
    return info;
  }

  async getClusterNodes(): Promise<string> {
    const nodes = await this.redis.cluster('NODES');
    return nodes as string;
  }
}
