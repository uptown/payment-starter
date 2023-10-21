import { Module } from '@nestjs/common';
import { PostFacade } from '~/application/post/post.facade';
import { PostDomainModule } from '~/domain/post/postDomain.module';
import { SocialDomainModule } from '~/domain/social/socialDomain.module';
import { UserDomainModule } from '~/domain/user/userDomain.module';
import { PostReactionFacade } from '~/application/post/postReaction.facade';

@Module({
  imports: [PostDomainModule, SocialDomainModule, UserDomainModule],
  exports: [PostFacade, PostReactionFacade],
  providers: [PostFacade, PostReactionFacade],
})
export class PostAppModule {}
