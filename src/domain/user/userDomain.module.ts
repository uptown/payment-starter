import { Module } from '@nestjs/common';
import { UserEntity } from './repository/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UserService],
  providers: [UserService, UserRepository],
})
export class UserDomainModule {}
