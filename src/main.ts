import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import { AppModule } from './app.module';
import { clientConfig } from './config/app-client-config';
import './types/session.types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Session configuration
  app.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      name: 'jera_s',
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 6 * 60 * 60 * 1000, // 6 hours
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      },
    }),
  );

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
