import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType } from '~/@shared/enums/roleType';
import { UserDto } from '~/domain/user/dto/user.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<RoleType[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { getUser } = <
      {
        getUser: () => Promise<UserDto>;
      }
    >request.user;

    const user = await getUser();

    return roles.includes(user.role);
  }
}
