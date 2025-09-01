import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
export declare class SupabaseService {
    private readonly configService;
    private supabase;
    constructor(configService: ConfigService);
    getClient(): SupabaseClient;
}
