import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { DataNotFoundError } from '~/@shared/errors/@domain/dataNotFoundError';
import { DataConflictError } from '~/@shared/errors/@domain/dataConflictError';

/**
 * TypeORM이 throw 하는 Error를 직접 관리하는 DataError 로 바꾼다
 */
export const convertTypeOrmErrorToDataError = (e: Error, dataType: string) => {
  if (e instanceof QueryFailedError) {
    return new DataConflictError(dataType, e.message);
  }
  if (e instanceof EntityNotFoundError) {
    return new DataNotFoundError(dataType, e.message);
  }
  return e;
};
