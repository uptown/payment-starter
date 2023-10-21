import { ApiProperty } from '@nestjs/swagger';
import { TokenDto } from '~/domain/auth/dto/tokenDto';

export class TokenResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  expiresIn: number;

  static of(tokenDto: TokenDto) {
    const response = new TokenResponse();
    response.accessToken = tokenDto.accessToken;
    response.refreshToken = tokenDto.refreshToken;
    response.expiresIn = tokenDto.expiresIn;
    return response;
  }
}
