import { RoleType } from '~/@shared/enums/roleType';

export class UserDto {
  id: number;
  email: string;
  role: RoleType;
  passwordHash?: string;
  createdAt: Date;
  updatedAt: Date;
}
