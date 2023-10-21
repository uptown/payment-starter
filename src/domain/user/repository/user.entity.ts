import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';

import { UserDto } from '../dto/user.dto';
import { RoleType } from '~/@shared/enums/roleType';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 200,
  })
  email: string;

  @Column({ nullable: true, length: 80 })
  passwordHash?: string;

  @Column({
    type: 'varchar',
    length: 4,
    default: RoleType.USER,
  })
  role: RoleType;

  @CreateDateColumn({
    type: 'datetime',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
  })
  updatedAt: Date;

  toDto(): UserDto {
    // https://github.com/typestack/class-transformer
    return plainToInstance(UserDto, instanceToPlain(this));
  }
}
