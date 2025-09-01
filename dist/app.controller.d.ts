import { AppService } from './app.service';
import { SupabaseService } from './supabase/supabase.service';
export declare class AppController {
    private readonly appService;
    private readonly supabaseService;
    constructor(appService: AppService, supabaseService: SupabaseService);
    healthCheck(): Promise<{
        status: string;
        error: string;
        data?: undefined;
    } | {
        status: string;
        data: any[];
        error?: undefined;
    }>;
}
