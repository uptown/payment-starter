import { Injectable } from '@nestjs/common';
import { PostRepository } from '~/domain/post/repository/post.repository';
import { Result } from '@leejuyoung/result';
import { PostReactionRepository } from '~/domain/post/repository/postReaction.repository';
import { In } from 'typeorm';
import {
  PostCreationType,
  PostReactionCreationType,
  PostReactionDeletionType,
} from '~/domain/post/types';
import { PostDto } from '~/domain/post/dto/post.dto';
import { PostReactionDto } from '~/domain/post/dto/postReaction.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postReactionRepository: PostReactionRepository,
  ) {}

  async findOne(id: number): Promise<Result<PostDto>> {
    return this.postRepository.findOne({
      id,
    });
  }

  async findReactionsByPostId(
    postId: number,
  ): Promise<Result<PostReactionDto[]>> {
    return this.postReactionRepository.findMany({
      where: {
        postId,
      },
    });
  }
  async findAllByUserIdsOrderByIdDesc(
    userIds: number[],
  ): Promise<Result<PostDto[]>> {
    return this.postRepository.findMany({
      where: {
        userId: In(userIds),
      },
    });
  }
  async createPost(postCreationType: PostCreationType) {
    return this.postRepository.create({
      title: postCreationType.title,
      description: postCreationType.description,
      userId: postCreationType.userId,
    });
  }
  async deletePost(postId: number) {
    return this.postRepository.delete(postId);
  }
  async createReaction(postReactionCreationType: PostReactionCreationType) {
    return this.postReactionRepository.create({
      postId: postReactionCreationType.postId,
      userId: postReactionCreationType.userId,
      reaction: postReactionCreationType.reaction,
    });
  }
  async deleteReaction(postReactionDeletionType: PostReactionDeletionType) {
    return this.postReactionRepository.delete({
      postId: postReactionDeletionType.postId,
      userId: postReactionDeletionType.userId,
    });
  }
}
