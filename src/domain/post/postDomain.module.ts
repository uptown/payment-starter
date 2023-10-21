import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '~/domain/post/repository/post.entity';
import { PostReactionEntity } from '~/domain/post/repository/postReaction.entity';
import { PostRepository } from '~/domain/post/repository/post.repository';
import { PostReactionRepository } from '~/domain/post/repository/postReaction.repository';
import { PostService } from '~/domain/post/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, PostReactionEntity])],
  exports: [PostService],
  providers: [PostService, PostRepository, PostReactionRepository],
})
export class PostDomainModule {}
