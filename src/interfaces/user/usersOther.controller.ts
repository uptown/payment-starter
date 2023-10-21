import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserResponse } from '~/interfaces/@response/user.response';
import { UserFacade } from '~/application/user/user.facade';
import { UserId } from '~/interfaces/@decorator/userId';
import { UserFollowFacade } from '~/application/user/userFollow.facade';
import { UserOnly } from '~/interfaces/@decorator/userOnly';
import { SocialFacade } from '~/application/social/social.facade';
import { ParamInt } from '~/interfaces/@decorator/paramInt';

@Controller('users')
@ApiTags('users')
export class UsersOtherController {
  constructor(
    private readonly userFacade: UserFacade,
    private readonly userFollowFacade: UserFollowFacade,
    private readonly socialFacade: SocialFacade,
  ) {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async one(@ParamInt('id') id: number): Promise<UserResponse> {
    return UserResponse.of(
      await this.userFacade.findOneById(id).then((v) => v.getOrThrow()),
    );
  }

  @Get('/:id/followers')
  @HttpCode(HttpStatus.OK)
  async otherFollowers(
    @ParamInt('id') userId: number,
  ): Promise<UserResponse[]> {
    return this.userFollowFacade
      .findFollowerUsersByUserId(userId)
      .then((ret) => ret.getOrThrow())
      .then((users) => {
        return users.map((user) => UserResponse.of(user));
      });
  }

  @Get('/:id/followings')
  @HttpCode(HttpStatus.OK)
  async otherFollowings(
    @ParamInt('id') userId: number,
  ): Promise<UserResponse[]> {
    return this.userFollowFacade
      .findFollowingUsersByUserId(userId)
      .then((ret) => ret.getOrThrow())
      .then((users) => {
        return users.map((user) => UserResponse.of(user));
      });
  }

  @Post('/:id/followings')
  @UserOnly()
  @HttpCode(HttpStatus.CREATED)
  async follow(
    @UserId() meId: number,
    @ParamInt('id') userId: number,
  ): Promise<boolean> {
    await this.socialFacade.follow(meId, userId).then((v) => v.getOrThrow());
    return true;
  }

  @Delete('/:id/followings')
  @UserOnly()
  @HttpCode(HttpStatus.OK)
  async unfollow(
    @UserId() meId: number,
    @ParamInt('id') userId: number,
  ): Promise<boolean> {
    await this.socialFacade.unfollow(meId, userId).then((v) => v.getOrThrow());
    return true;
  }
}
