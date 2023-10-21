import { Injectable } from '@nestjs/common';
import { UserDto } from '~/domain/user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigureService } from '~/infrastructure/configure/configure.service';
import { TokenType } from '~/domain/auth/enums/tokenType';
import { TokenDto } from '~/domain/auth/dto/tokenDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configureService: ConfigureService,
  ) {}

  createToken(user: UserDto): TokenDto {
    const accessToken = this.jwtService.sign({
      uid: user.id,
      ty: TokenType.ACCESS,
    });
    const refreshToken = this.jwtService.sign(
      {
        uid: user.id,
        ty: TokenType.REFRESH,
      },
      {
        expiresIn: '30d',
      },
    );

    return {
      expiresIn:
        (this.configureService.jwtConfig.signOptions?.expiresIn as number) ||
        3600,
      accessToken,
      refreshToken,
    };
  }
}
