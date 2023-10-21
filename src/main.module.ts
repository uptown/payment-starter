import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { RestfulModule } from './interfaces/restfulModule';
import { ConfigureModule } from '~/infrastructure/configure/configure.module';

@Module({
  imports: [ConfigureModule, DatabaseModule, RestfulModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
