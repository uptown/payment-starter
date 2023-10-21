import { Injectable } from '@nestjs/common';
import { UserService } from '~/domain/user/user.service';
import { AuthService } from '~/domain/auth/auth.service';
import { CreateUserRequest } from '~/interfaces/@request/createUser.request';
import { Result } from '@leejuyoung/result';
import { validatePasswordWithHash } from '~/infrastructure/utils/password/validatePasswordWithHash';
import { PasswordInvalidError } from '~/@shared/errors/user/passwordInvalidError';
import { CreateSessionsRequest } from '~/interfaces/@request/createSessionsRequest';

@Injectable()
export class UserFacade {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async register(createUserDto: CreateUserRequest) {
    return this.userService.createUser(createUserDto);
  }

  async findOneById(id: number) {
    return this.userService.findOne(id);
  }
  async login(createSessionsRequest: CreateSessionsRequest) {
    const userResult = await this.userService.findOneByEmail(
      createSessionsRequest.email,
    );
    if (userResult.isFailure()) {
      return Result.failure(userResult.exception());
    }

    const user = userResult.getOrThrow();

    if (
      !user.passwordHash ||
      !(await validatePasswordWithHash(
        createSessionsRequest.password,
        user.passwordHash,
      ))
    ) {
      return Result.failure(new PasswordInvalidError());
    }
    return Result.of(this.authService.createToken(userResult.getOrThrow()));
  }
}
