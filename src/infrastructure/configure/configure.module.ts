import { Module } from '@nestjs/common';
import { ConfigureService } from './configure.service';

@Module({
  providers: [ConfigureService],
  exports: [ConfigureService],
})
export class ConfigureModule {}
