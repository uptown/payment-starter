import { BaseDataError } from './baseDataError';
import { ErrorCodeType } from '../../enums/errorCodeType';

export class DataInvalidError extends BaseDataError {
  code = ErrorCodeType.DATA_INVALID;
}
