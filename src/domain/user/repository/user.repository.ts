import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { PromiseResult, Result } from '@leejuyoung/result';
import { UserDto } from '../dto/user.dto';
import { convertTypeOrmErrorToDataError } from '~/infrastructure/utils/repository/convertTypeOrmErrorToDataError';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { DataNotFoundError } from '~/@shared/errors/@domain/dataNotFoundError';
import { DataConflictError } from '~/@shared/errors/@domain/dataConflictError';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userOrmRepository: Repository<UserEntity>,
  ) {}

  async findMany(
    findData: FindManyOptions<UserDto>,
  ): PromiseResult<UserDto[], Error> {
    return Result.of(
      this.userOrmRepository
        .find(findData)
        .then((entity) => {
          return entity.map((each) => each.toDto());
        })
        .catch((e) => {
          throw convertTypeOrmErrorToDataError(e, 'user');
        }),
    );
  }

  async findOne(
    findData: FindOptionsWhere<UserDto>,
  ): PromiseResult<UserDto, DataNotFoundError> {
    return Result.of(
      this.userOrmRepository
        .findOneByOrFail(findData)
        .then((entity) => {
          return entity.toDto();
        })
        .catch((e) => {
          throw convertTypeOrmErrorToDataError(e, 'user');
        }),
    );
  }

  async create(
    data: DeepPartial<UserDto>,
  ): PromiseResult<UserDto, DataConflictError> {
    return Result.of(
      this.userOrmRepository
        .save(
          this.userOrmRepository.create({
            email: data.email,
            passwordHash: data.passwordHash,
          }),
        )
        .then((entity) => {
          return entity.toDto();
        })
        .catch((e) => {
          throw convertTypeOrmErrorToDataError(e, 'user');
        }),
    );
  }
}
