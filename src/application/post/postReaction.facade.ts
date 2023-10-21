import { Injectable } from '@nestjs/common';
import { PostService } from '~/domain/post/post.service';
import { UserService } from '~/domain/user/user.service';
import { Result } from '@leejuyoung/result';
import { UserDto } from '~/domain/user/dto/user.dto';
import { ReactionWithUserDto } from '~/domain/post/dto/reactionWithUser.dto';

@Injectable()
export class PostReactionFacade {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  async findReactionsByPostId(postId: number) {
    return Result.of(async () => {
      const reactionDtos = await this.postService
        .findReactionsByPostId(postId)
        .then((v) => v.getOrThrow());

      const reactors = await this.userService
        .findMany(reactionDtos.map((v) => v.userId))
        .then((v) => v.getOrThrow())
        .then((dtos) => {
          return dtos.reduce((acc, dto) => {
            acc[dto.id] = dto;
            return acc;
          }, {} as Record<number, UserDto>);
        });
      return reactionDtos.map((reaction) => {
        const dto = new ReactionWithUserDto();
        dto.reaction = reaction;
        dto.user = reactors[reaction.userId];
        return dto;
      });
    });
  }
}
