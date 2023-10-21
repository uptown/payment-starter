import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class WritePostRequest {
  @ApiProperty({
    minLength: 1,
    maxLength: 80,
  })
  @IsString()
  @Length(1, 80)
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ minLength: 1, maxLength: 1000 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 1000)
  readonly description: string;
}
