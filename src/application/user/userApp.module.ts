import { Module } from '@nestjs/common';
import { UserDomainModule } from '~/domain/user/userDomain.module';
import { UserFacade } from '~/application/user/user.facade';
import { AuthDomainModule } from '~/domain/auth/authDomainModule';
import { AccessTokenStrategy } from '~/application/user/accessToken.strategy';
import { ConfigureModule } from '~/infrastructure/configure/configure.module';
import { UserFollowFacade } from '~/application/user/userFollow.facade';
import { SocialDomainModule } from '~/domain/social/socialDomain.module';

@Module({
  imports: [
    UserDomainModule,
    SocialDomainModule,
    AuthDomainModule,
    ConfigureModule,
  ],
  exports: [UserFacade, UserFollowFacade, AccessTokenStrategy],
  providers: [UserFacade, UserFollowFacade, AccessTokenStrategy],
})
export class UserAppModule {}
