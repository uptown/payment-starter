import { Test } from '@nestjs/testing';
import { RestfulModule } from '~/interfaces/restfulModule';
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { MainExceptionFilter } from '~/mainExceptionFilter';
import { TestConfigureModule } from '~/infrastructure/forTest/testConfigurationModule';
import { InMemoryTypeOrmModule } from '~/infrastructure/forTest/inMemoryTypeOrmModule';

export const createE2ETestApp = async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [TestConfigureModule, InMemoryTypeOrmModule, RestfulModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  // https://docs.nestjs.com/techniques/validation#auto-validation
  app.useGlobalPipes(new ValidationPipe());
  // https://docs.nestjs.com/exception-filters#exception-filters-1
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new MainExceptionFilter(httpAdapter));
  await app.init();
  return app;
};
