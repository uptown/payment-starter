import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { PromiseResult, Result } from '@leejuyoung/result';
import { convertTypeOrmErrorToDataError } from '~/infrastructure/utils/repository/convertTypeOrmErrorToDataError';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { DataNotFoundError } from '~/@shared/errors/@domain/dataNotFoundError';
import { DataConflictError } from '~/@shared/errors/@domain/dataConflictError';
import { Injectable } from '@nestjs/common';
import { UserFollowEntity } from '~/domain/social/repository/userFollow.entity';
import { UserFollowDto } from '~/domain/social/dto/userFollow.dto';

@Injectable()
export class UserFollowRepository {
  constructor(
    @InjectRepository(UserFollowEntity)
    private userFollowEntityRepository: Repository<UserFollowEntity>,
  ) {}

  async findMany(
    findData: FindManyOptions<UserFollowDto>,
  ): PromiseResult<UserFollowDto[], DataNotFoundError> {
    return Result.of(
      this.userFollowEntityRepository
        .find(findData)
        .then((entities) => {
          return entities.map((v) => v.toDto());
        })
        .catch((e) => {
          throw convertTypeOrmErrorToDataError(e, 'userFollow');
        }),
    );
  }

  async create(
    data: DeepPartial<UserFollowDto>,
  ): PromiseResult<UserFollowDto, DataConflictError> {
    return Result.of(
      this.userFollowEntityRepository
        .save(
          this.userFollowEntityRepository.create({
            fromUserId: data.fromUserId,
            toUserId: data.toUserId,
          }),
        )
        .then((entity) => {
          return entity.toDto();
        })
        .catch((e) => {
          throw convertTypeOrmErrorToDataError(e, 'postReaction');
        }),
    );
  }

  async delete(findData: FindOptionsWhere<UserFollowDto>) {
    return Result.of(
      this.userFollowEntityRepository.delete(findData).catch((e) => {
        throw convertTypeOrmErrorToDataError(e, 'postReaction');
      }),
    );
  }
}
