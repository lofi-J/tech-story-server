import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { clientConfig } from './config/app-client-config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  healthCheck() {
    console.log(
      `health check from ${clientConfig().host}:${clientConfig().port}`,
    );
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
