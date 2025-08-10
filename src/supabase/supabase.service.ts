import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseRoleKey = this.configService.get<string>(
      'SUPABASE_SERVICE_ROLE_KEY',
    );

    console.log('Supabase URL:', supabaseUrl ? 'Found' : 'Not found');
    console.log('Supabase Key:', supabaseRoleKey ? 'Found' : 'Not found');

    if (!supabaseUrl || !supabaseRoleKey) {
      throw new Error('Supabase URL or role key is not set');
    }

    this.supabase = createClient(supabaseUrl, supabaseRoleKey);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}
