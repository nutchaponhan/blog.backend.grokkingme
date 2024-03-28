import { Controller, Get } from '@nestjs/common';

@Controller({ version: '1' })
export class AppController {
  constructor() {}

  @Get('health')
  async getHello(): Promise<{ message: string }> {
    return {
      message: 'app running',
    };
  }
}
