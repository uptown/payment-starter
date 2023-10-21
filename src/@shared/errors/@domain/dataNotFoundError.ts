import { BaseDataError } from './baseDataError';
import { ErrorCodeType } from '~/@shared/enums/errorCodeType';
import { HttpException, HttpStatus } from '@nestjs/common';

export class DataNotFoundError extends BaseDataError {
  code = ErrorCodeType.DATA_NOT_FOUND;

  get message(): string {
    return this.dataType + '_not_found';
  }

  toHttpException(): HttpException {
    return new HttpException(this.message, HttpStatus.NOT_FOUND);
  }
}
