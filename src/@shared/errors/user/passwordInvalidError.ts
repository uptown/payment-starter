import { BaseError } from '~/@shared/errors/baseError';
import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordInvalidError extends BaseError {
  toHttpException(): HttpException {
    return new HttpException('password_invalid', HttpStatus.BAD_REQUEST);
  }
}
