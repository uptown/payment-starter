import { Injectable, Logger } from '@nestjs/common';
import { SocialService } from '~/domain/social/social.service';

@Injectable()
export class SocialFacade {
  private readonly logger = new Logger(SocialFacade.name);
  constructor(private readonly socialService: SocialService) {}

  async follow(userId: number, followingUserId: number) {
    const ret = await this.socialService.createFollow({
      fromUserId: userId,
      toUserId: followingUserId,
    });

    this.logger.log(`User(${userId}) follows User(${followingUserId})`);

    return ret;
  }
  async unfollow(userId: number, followingUserId: number) {
    const ret = this.socialService.deleteFollow({
      fromUserId: userId,
      toUserId: followingUserId,
    });
    this.logger.log(`User(${userId}) unfollows User(${followingUserId})`);

    return ret;
  }
}
