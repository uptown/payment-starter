import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { PromiseResult, Result } from '@leejuyoung/result';
import { convertTypeOrmErrorToDataError } from '~/infrastructure/utils/repository/convertTypeOrmErrorToDataError';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { DataNotFoundError } from '~/@shared/errors/@domain/dataNotFoundError';
import { DataConflictError } from '~/@shared/errors/@domain/dataConflictError';
import { Injectable } from '@nestjs/common';
import { PostReactionEntity } from '~/domain/post/repository/postReaction.entity';
import { PostReactionDto } from '~/domain/post/dto/postReaction.dto';

@Injectable()
export class PostReactionRepository {
  constructor(
    @InjectRepository(PostReactionEntity)
    private postReactionEntityRepository: Repository<PostReactionEntity>,
  ) {}

  async findMany(
    findData: FindManyOptions<PostReactionDto>,
  ): PromiseResult<PostReactionDto[], DataNotFoundError> {
    return Result.of(
      this.postReactionEntityRepository
        .find(findData)
        .then((entities) => {
          return entities.map((v) => v.toDto());
        })
        .catch((e) => {
          throw convertTypeOrmErrorToDataError(e, 'postReaction');
        }),
    );
  }

  async create(
    data: DeepPartial<PostReactionDto>,
  ): PromiseResult<PostReactionDto, DataConflictError> {
    return Result.of(
      this.postReactionEntityRepository
        .save(
          this.postReactionEntityRepository.create({
            postId: data.postId,
            userId: data.userId,
            reaction: data.reaction,
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

  async delete(findData: FindOptionsWhere<PostReactionDto>) {
    return Result.of(
      this.postReactionEntityRepository.delete(findData).catch((e) => {
        throw convertTypeOrmErrorToDataError(e, 'postReaction');
      }),
    );
  }
}
