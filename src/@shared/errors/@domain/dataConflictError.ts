import { ErrorCodeType } from '../../enums/errorCodeType';
import { BaseDataError } from './baseDataError';
import { HttpException, HttpStatus } from '@nestjs/common';

export class DataConflictError extends BaseDataError {
  code = ErrorCodeType.DATA_CONFLICT;

  toHttpException(): HttpException {
    return new HttpException(this.message, HttpStatus.CONFLICT);
  }
}
