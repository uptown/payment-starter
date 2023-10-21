import { Module } from '@nestjs/common';
import { SocialDomainModule } from '~/domain/social/socialDomain.module';
import { SocialFacade } from '~/application/social/social.facade';

@Module({
  imports: [SocialDomainModule],
  exports: [SocialFacade],
  providers: [SocialFacade],
})
export class SocialAppModule {}
