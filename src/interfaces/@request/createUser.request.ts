import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserRequest {
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
