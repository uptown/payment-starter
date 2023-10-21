import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserFacade } from '~/application/user/user.facade';
import { CreateSessionsRequest } from '~/interfaces/@request/createSessionsRequest';
import { TokenResponse } from '~/interfaces/@response/token.response';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly userFacade: UserFacade) {}

  @Post('sessions')
  @HttpCode(HttpStatus.CREATED)
  async createSessions(
    @Body() createSessionsRequest: CreateSessionsRequest,
  ): Promise<TokenResponse> {
    const loginResult = await this.userFacade.login(createSessionsRequest);
    if (loginResult.isFailure()) {
      throw loginResult.exception();
    }
    return TokenResponse.of(loginResult.getOrThrow());
  }
}
