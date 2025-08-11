import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { clientConfig } from './config/app-client-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app configuration
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? undefined
        : [
            `http://${clientConfig().host}:${clientConfig().port}`,
            `https://${clientConfig().host}:${clientConfig().port}`,
          ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Apollo-Require-Preflight',
    ],
    credentials: true,
  });

  await app.listen(process.env.DEFAULT_PORT ?? 3000);
  console.log(`App is running on port ${process.env.DEFAULT_PORT ?? 3000}`);
}
void bootstrap();
