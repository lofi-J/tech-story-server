import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export const isPrismaError = (
  error: unknown,
): error is Prisma.PrismaClientKnownRequestError => {
  return error instanceof Prisma.PrismaClientKnownRequestError;
};

export const handlePrismaError = (
  error: Prisma.PrismaClientKnownRequestError,
) => {
  switch (error.code) {
    case 'P2002':
      throw new HttpException(
        'Unique constraint violation',
        HttpStatus.CONFLICT,
      );

    case 'P2003':
      throw new HttpException(
        'Foreign key constraint violation',
        HttpStatus.BAD_REQUEST,
      );

    case 'P2025':
      throw new HttpException('Record not found', HttpStatus.NOT_FOUND);

    case 'P2014':
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);

    case 'P2021':
      throw new HttpException(
        'Table does not exist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    case 'P2022':
      throw new HttpException(
        'Column does not exist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    default:
      // 기타 Prisma 에러 (추후 추가)
      console.error('Unknown Prisma error:', error);
      throw new HttpException(
        '데이터베이스 오류가 발생했습니다(default prisma error)',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }
};
