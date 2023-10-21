import { PostDto } from '~/domain/post/dto/post.dto';
import { UserDto } from '~/domain/user/dto/user.dto';

export class PostWithUserDto {
  post: PostDto;
  user: UserDto;
}
