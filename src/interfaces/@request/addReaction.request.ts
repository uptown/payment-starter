import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ReactionType } from '~/domain/post/dto/reactionType';

export class AddReactionRequest {
  @ApiProperty()
  @IsNotEmpty()
  readonly postId: number;
  @ApiProperty({
    enum: ReactionType,
  })
  @IsNotEmpty()
  readonly reaction: ReactionType;
}
