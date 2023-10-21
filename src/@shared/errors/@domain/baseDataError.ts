import { ErrorCodeType } from '../../enums/errorCodeType';
import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseError } from '~/@shared/errors/baseError';

export class BaseDataError extends BaseError {
  code = ErrorCodeType.UNKNOWN;

  constructor(public readonly dataType: string, message?: string) {
    super(message);
  }

  get message(): string {
    return this.code + +' / ' + this.dataType + ' / ' + super.message;
  }

  toHttpException(): HttpException {
    return new HttpException(this.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
