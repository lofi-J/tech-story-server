import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { clientConfig } from './config/app-client-config';

async function bootstrap() {
  // BigInt JSON serialization 설정
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  (BigInt.prototype as any).toJSON = function (this: bigint): string {
    return this.toString();
  };

  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

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
