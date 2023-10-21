import { UserDto } from '~/domain/user/dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  static of(userDto: UserDto) {
    const response = new UserResponse();
    response.id = userDto.id;
    response.email = userDto.email;
    return response;
  }
}
