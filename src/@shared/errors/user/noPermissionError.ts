import { BaseError } from '~/@shared/errors/baseError';
import { HttpException, HttpStatus } from '@nestjs/common';

export class NoPermissionError extends BaseError {
  toHttpException(): HttpException {
    return new HttpException('no_permission', HttpStatus.FORBIDDEN);
  }
}
