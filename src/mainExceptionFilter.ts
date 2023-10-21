import { ArgumentsHost, Catch, HttpServer } from '@nestjs/common';
import { BaseError } from '~/@shared/errors/baseError';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(BaseError)
export class MainExceptionFilter extends BaseExceptionFilter {
  constructor(protected readonly httpAdapter: HttpServer) {
    super(httpAdapter);
  }
  catch(exception: BaseError, host: ArgumentsHost) {
    return super.catch(exception.toHttpException(), host);
  }
}
