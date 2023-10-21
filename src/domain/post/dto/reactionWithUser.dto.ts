import { UserDto } from '~/domain/user/dto/user.dto';
import { PostReactionDto } from '~/domain/post/dto/postReaction.dto';

export class ReactionWithUserDto {
  reaction: PostReactionDto;
  user: UserDto;
}
