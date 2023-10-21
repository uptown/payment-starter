import { Injectable } from '@nestjs/common';
import { Result } from '@leejuyoung/result';
import { UserFollowRepository } from '~/domain/social/repository/userFollow.repository';
import { FollowInputType } from '~/domain/social/types';

@Injectable()
export class SocialService {
  constructor(private readonly userFollowRepository: UserFollowRepository) {}

  async findFollowerIdsByUserId(toUserId: number): Promise<Result<number[]>> {
    const result = await this.userFollowRepository.findMany({
      where: {
        toUserId,
      },
    });
    if (result.isFailure()) {
      return Result.failure(result.exception());
    }
    return Result.success(result.getOrThrow().map((v) => v.fromUserId));
  }
  async findFollowingIdsByUserIds(
    fromUserId: number,
  ): Promise<Result<number[]>> {
    const result = await this.userFollowRepository.findMany({
      where: {
        fromUserId,
      },
    });
    if (result.isFailure()) {
      return Result.failure(result.exception());
    }
    return Result.success(result.getOrThrow().map((v) => v.toUserId));
  }
  async createFollow(followInputType: FollowInputType) {
    return this.userFollowRepository.create({
      fromUserId: followInputType.fromUserId,
      toUserId: followInputType.toUserId,
    });
  }
  async deleteFollow(followInputType: FollowInputType) {
    return this.userFollowRepository.delete({
      fromUserId: followInputType.fromUserId,
      toUserId: followInputType.toUserId,
    });
  }
}
