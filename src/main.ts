import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import { AppModule } from './app.module';
import { clientConfig } from './config/app-client-config';
import './types/session.types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Session configuration
  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    console.error('경고: SESSION_SECRET 환경변수가 설정되지 않았습니다!');
    if (process.env.NODE_ENV === 'production') {
      throw new Error('SESSION_SECRET 환경변수는 프로덕션에서 필수입니다!');
    }
  }

  app.use(
    session({
      secret: sessionSecret || 'dev-fallback-secret-change-in-production',
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
        ? process.env.FRONTEND_URL || true // 프로덕션에서는 FRONTEND_URL 환경변수 사용, 없으면 모든 origin 허용
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
