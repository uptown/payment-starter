import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { convertPasswordToPasswordHash } from '~/infrastructure/utils/password/convertPasswordToPasswordHash';
import { UserCreationType } from '~/domain/user/types';
import { In } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findMany(ids: number[]) {
    return this.userRepository.findMany({
      where: {
        id: In(ids),
      },
    });
  }
  findOne(id: number) {
    return this.userRepository.findOne({
      id,
    });
  }
  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      email,
    });
  }
  async createUser(userCreation: UserCreationType) {
    return this.userRepository.create({
      email: userCreation.email,
      passwordHash: await convertPasswordToPasswordHash(userCreation.password),
    });
  }
}
