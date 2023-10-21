import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigureModule } from '~/infrastructure/configure/configure.module';
import { ConfigureService } from '~/infrastructure/configure/configure.service';
import { AuthService } from '~/domain/auth/auth.service';

@Module({
  imports: [
    ConfigureModule,
    JwtModule.registerAsync({
      imports: [ConfigureModule],
      useFactory: (configService: ConfigureService) => configService.jwtConfig,
      inject: [ConfigureService],
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthDomainModule {}
