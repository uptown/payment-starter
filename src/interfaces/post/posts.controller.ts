import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostFacade } from '~/application/post/post.facade';
import { PostResponse } from '~/interfaces/@response/post.response';
import { UserOnly } from '~/interfaces/@decorator/userOnly';
import { WritePostRequest } from '~/interfaces/@request/writePost.request';
import { User } from '~/interfaces/@decorator/user';
import { UserDto } from '~/domain/user/dto/user.dto';
import { UserId } from '~/interfaces/@decorator/userId';
import { ParamInt } from '~/interfaces/@decorator/paramInt';
import { OkResponse } from '~/interfaces/@response/ok.response';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postFacade: PostFacade) {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async readOne(@ParamInt('id') id: number): Promise<PostResponse> {
    const post = await this.postFacade
      .findPostById(id)
      .then((v) => v.getOrThrow());
    return PostResponse.of(post);
  }

  @Post()
  @UserOnly()
  @HttpCode(HttpStatus.CREATED)
  async writePost(
    @User() user: UserDto,
    @Body() writePostRequest: WritePostRequest,
  ): Promise<PostResponse> {
    const post = await this.postFacade
      .writePost(user.id, writePostRequest)
      .then((v) => v.getOrThrow());
    return PostResponse.of({
      post,
      user,
    });
  }

  @Delete('/:id')
  @UserOnly()
  @HttpCode(HttpStatus.OK)
  async deletePost(
    @UserId() userId: number,
    @ParamInt('id') postId: number,
  ): Promise<OkResponse> {
    await this.postFacade
      .deletePost(postId, userId)
      .then((v) => v.getOrThrow());
    return OkResponse.of();
  }
}
