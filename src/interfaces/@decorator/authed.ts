import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleType } from '~/@shared/enums/roleType';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '~/interfaces/@guard/rolesGuard';

export function Authed(roles: RoleType[]): MethodDecorator {
  return applyDecorators(
    SetMetadata('roles', roles || []),
    UseGuards(AuthGuard('jwt'), RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
