import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { clientConfig } from './config/app-client-config';
import { SupabaseService } from './supabase/supabase.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Get('health')
  async healthCheck() {
    console.log(
      `health check from ${clientConfig().host}:${clientConfig().port}`,
    );

    const supabaseClient = this.supabaseService.getClient();
    const { data, error } = await supabaseClient.from('dev_post').select('*');

    if (error) {
      return {
        status: 'error',
        error: error.message,
      };
    }

    return {
      status: 'ok',
      data,
    };
  }
}
