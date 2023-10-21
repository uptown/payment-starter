import { Injectable } from '@nestjs/common';
import { PostService } from '~/domain/post/post.service';
import { WritePostRequest } from '~/interfaces/@request/writePost.request';
import { AddReactionRequest } from '~/interfaces/@request/addReaction.request';
import { DeleteReactionRequest } from '~/interfaces/@request/deleteReaction.request';
import { SocialService } from '~/domain/social/social.service';
import { Result } from '@leejuyoung/result';
import { NoPermissionError } from '~/@shared/errors/user/noPermissionError';
import { UserService } from '~/domain/user/user.service';
import { PostWithUserDto } from '~/domain/post/dto/postWithUser.dto';
import { UserDto } from '~/domain/user/dto/user.dto';

@Injectable()
export class PostFacade {
  constructor(
    private readonly postService: PostService,
    private readonly socialService: SocialService,

    private readonly userService: UserService,
  ) {}

  async findPostById(id: number) {
    return Result.of(async () => {
      const post = await this.postService
        .findOne(id)
        .then((v) => v.getOrThrow());

      const author = await this.userService
        .findOne(post.id)
        .then((v) => v.getOrThrow());
      const dto = new PostWithUserDto();
      dto.post = post;
      dto.user = author;
      return dto;
    });
  }
  async findPostsByUserId(userId: number) {
    return Result.of(async () => {
      const posts = await this.postService
        .findAllByUserIdsOrderByIdDesc([userId])
        .then((v) => v.getOrThrow());

      const authorMap = await this.userService
        .findMany(posts.map((v) => v.userId))
        .then((v) => v.getOrThrow())
        .then((authors) => {
          return authors.reduce((acc, author) => {
            acc[author.id] = author;
            return acc;
          }, {} as Record<number, UserDto>);
        });
      return posts.map((post) => {
        const dto = new PostWithUserDto();
        dto.post = post;
        dto.user = authorMap[post.userId];
        return dto;
      });
    });
  }
  async findFollowingPostsByUserId(userId: number) {
    const followingUserIdsRet =
      await this.socialService.findFollowingIdsByUserIds(userId);
    if (followingUserIdsRet.isFailure()) {
      return Result.failure(followingUserIdsRet.exception());
    }
    const followingUserIds = followingUserIdsRet.getOrThrow();

    return this.postService.findAllByUserIdsOrderByIdDesc(followingUserIds);
  }

  async writePost(userId: number, writePostRequest: WritePostRequest) {
    return this.postService.createPost({
      title: writePostRequest.title,
      description: writePostRequest.description,
      userId,
    });
  }

  async deletePost(postId: number, userId: number) {
    return Result.of(async () => {
      if (
        (await this.postService.findOne(postId)).getOrThrow().userId != userId
      ) {
        throw new NoPermissionError();
      }
      return this.postService.deletePost(postId);
    });
  }
  async react(userId: number, addReactionRequest: AddReactionRequest) {
    return this.postService.createReaction({
      userId,
      ...addReactionRequest,
    });
  }
  async undoReact(
    userId: number,
    deleteReactionRequest: DeleteReactionRequest,
  ) {
    return this.postService.deleteReaction({
      userId,
      postId: deleteReactionRequest.postId,
    });
  }
}
