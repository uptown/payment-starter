import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteReactionRequest {
  @ApiProperty()
  @IsNotEmpty()
  readonly postId: number;
}
