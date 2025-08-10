import { registerAs } from '@nestjs/config';

export const clientConfig = registerAs('client', () => ({
  port: process.env.CLIENT_PORT ?? 3000,
  host: process.env.CLIENT_HOST ?? 'localhost',
}));
