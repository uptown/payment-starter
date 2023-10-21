import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from '~/interfaces/@response/user.response';
import { ReactionType } from '~/domain/post/dto/reactionType';
import { ReactionWithUserDto } from '~/domain/post/dto/reactionWithUser.dto';

export class ReactionResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  user: UserResponse;
  @ApiProperty({
    enum: [ReactionType.LIKE, ReactionType.SAD, ReactionType.HEART],
  })
  reaction: ReactionType;
  @ApiProperty()
  createdAt: Date;

  static of({ reaction: dto, user: userDto }: ReactionWithUserDto) {
    const response = new ReactionResponse();
    response.id = dto.id;
    response.user = UserResponse.of(userDto);
    response.reaction = dto.reaction;
    response.createdAt = dto.createdAt;
    return response;
  }
}
