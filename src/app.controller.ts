import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('api/health')
  async getHello(): Promise<{ message: string }> {
    return {
      message: 'app running',
    };
  }
}
