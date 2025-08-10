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
        : [`${clientConfig().host}:${clientConfig().port}`],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await app.listen(process.env.DEFAULT_PORT ?? 3000);
  console.log(`App is running on port ${process.env.DEFAULT_PORT ?? 3000}`);
}
void bootstrap();
