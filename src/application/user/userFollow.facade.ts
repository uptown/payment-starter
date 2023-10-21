import { Injectable } from '@nestjs/common';
import { SocialService } from '~/domain/social/social.service';
import { UserService } from '~/domain/user/user.service';
import { Result } from '@leejuyoung/result';

@Injectable()
export class UserFollowFacade {
  constructor(
    private readonly socialService: SocialService,
    private readonly userService: UserService,
  ) {}

  async findFollowingUsersByUserId(userId: number) {
    const result = await this.socialService.findFollowingIdsByUserIds(userId);

    if (result.isFailure()) {
      return Result.failure(result.exception());
    }

    return this.userService.findMany(result.getOrThrow());
  }
  async findFollowerUsersByUserId(userId: number) {
    const result = await this.socialService.findFollowerIdsByUserId(userId);

    if (result.isFailure()) {
      return Result.failure(result.exception());
    }

    return this.userService.findMany(result.getOrThrow());
  }
}
