import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigureService } from '~/infrastructure/configure/configure.service';
import { TokenType } from '~/domain/auth/enums/tokenType';
import asyncOnce from '~/infrastructure/utils/async/asyncOnce';
import { UserFacade } from '~/application/user/user.facade';

/**
 * JWT Token으로 인증을 처리하기 위해서 사용되는 인스턴스
 * @see https://docs.nestjs.com/security/authentication#jwt-functionality
 */
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configureService: ConfigureService,
    private readonly userFacade: UserFacade,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configureService.jwtConfig.privateKey,
    });
  }

  async validate(payload: { ty: TokenType; uid: number }) {
    if (payload.ty === TokenType.ACCESS) {
      return {
        id: payload.uid,
        getUser: asyncOnce(() => {
          return this.userFacade
            .findOneById(payload.uid)
            .then((v) => v.getOrThrow());
        }),
      };
    }
    throw new UnauthorizedException();
  }
}
