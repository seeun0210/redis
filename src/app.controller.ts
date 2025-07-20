import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('redis/set')
  async setKey(@Body() body: { key: string; value: string }) {
    return await this.appService.setKey(body.key, body.value);
  }

  @Get('redis/get/:key')
  async getKey(@Param('key') key: string) {
    return await this.appService.getKey(key);
  }

  @Delete('redis/delete/:key')
  async deleteKey(@Param('key') key: string) {
    return await this.appService.deleteKey(key);
  }

  @Get('redis/cluster/info')
  async getClusterInfo(): Promise<any> {
    return await this.appService.getClusterInfo();
  }

  @Get('redis/cluster/nodes')
  async getClusterNodes(): Promise<any> {
    return await this.appService.getClusterNodes();
  }
}
