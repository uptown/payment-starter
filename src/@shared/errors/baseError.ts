import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseError extends Error {
  constructor(message?: string) {
    super(message);
  }

  toHttpException(): HttpException {
    return new HttpException(this.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
