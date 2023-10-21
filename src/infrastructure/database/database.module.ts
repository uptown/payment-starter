import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigureModule } from '../configure/configure.module';
import { ConfigureService } from '../configure/configure.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigureModule],
      useFactory: (configService: ConfigureService) =>
        configService.typeORMConfig,
      inject: [ConfigureService],
    }),
  ],
})
export class DatabaseModule {}
