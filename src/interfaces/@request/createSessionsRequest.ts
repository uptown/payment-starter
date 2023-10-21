import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateSessionsRequest {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ minLength: 8 })
  @IsString()
  @MinLength(8)
  readonly password: string;
}
