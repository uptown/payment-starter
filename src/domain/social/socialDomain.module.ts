import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialService } from '~/domain/social/social.service';
import { UserFollowRepository } from '~/domain/social/repository/userFollow.repository';
import { UserFollowEntity } from '~/domain/social/repository/userFollow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserFollowEntity])],
  exports: [SocialService],
  providers: [SocialService, UserFollowRepository],
})
export class SocialDomainModule {}
