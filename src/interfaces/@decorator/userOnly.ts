import { RoleType } from '~/@shared/enums/roleType';
import { Authed } from '~/interfaces/@decorator/authed';

export function UserOnly(): MethodDecorator {
  return Authed([RoleType.USER, RoleType.ADMIN]);
}
