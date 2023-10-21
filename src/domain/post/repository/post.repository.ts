import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { PromiseResult, Result } from '@leejuyoung/result';
import { convertTypeOrmErrorToDataError } from '~/infrastructure/utils/repository/convertTypeOrmErrorToDataError';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { DataNotFoundError } from '~/@shared/errors/@domain/dataNotFoundError';
import { DataConflictError } from '~/@shared/errors/@domain/dataConflictError';
import { PostEntity } from '~/domain/post/repository/post.entity';
import { PostDto } from '~/domain/post/dto/post.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private postEntityRepository: Repository<PostEntity>,
  ) {}

  async findOne(
    findData: FindOptionsWhere<PostDto>,
  ): PromiseResult<PostDto, DataNotFoundError> {
    return Result.of(
      this.postEntityRepository
        .findOneByOrFail(findData)
        .then((entity) => {
          return entity.toDto();
        })
        .catch((e) => {
          throw convertTypeOrmErrorToDataError(e, 'user');
        }),
    );
  }

  async findMany(
    findData: FindManyOptions<PostEntity>,
  ): PromiseResult<PostDto[], DataNotFoundError> {
    return Result.of(
      this.postEntityRepository
        .find(findData)
        .then((entities) => {
          return entities.map((v) => v.toDto());
        })
        .catch((e) => {
          throw convertTypeOrmErrorToDataError(e, 'post');
        }),
    );
  }

  async create(
    data: DeepPartial<PostDto>,
  ): PromiseResult<PostDto, DataConflictError> {
    return Result.of(
      this.postEntityRepository
        .save(
          this.postEntityRepository.create({
            title: data.title,
            description: data.description,
            userId: data.userId,
          }),
        )
        .then((entity) => {
          return entity.toDto();
        })
        .catch((e) => {
          throw convertTypeOrmErrorToDataError(e, 'post');
        }),
    );
  }
  async delete(id: number): Promise<Result<DeleteResult, DataConflictError>> {
    return Result.of(async () => {
      return this.postEntityRepository.delete(id);
    });
  }
}
