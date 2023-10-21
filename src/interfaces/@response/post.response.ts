import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from '~/interfaces/@response/user.response';
import { PostWithUserDto } from '~/domain/post/dto/postWithUser.dto';

export class PostResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  user: UserResponse;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  static of({ post: postDto, user: userDto }: PostWithUserDto) {
    const response = new PostResponse();
    response.id = postDto.id;
    response.user = UserResponse.of(userDto);
    response.title = postDto.title;
    response.description = postDto.description;
    response.createdAt = postDto.createdAt;
    response.updatedAt = postDto.updatedAt;
    return response;
  }
}
