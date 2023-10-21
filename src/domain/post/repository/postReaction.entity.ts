import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ReactionType } from '~/domain/post/dto/reactionType';
import { PostEntity } from '~/domain/post/repository/post.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { PostReactionDto } from '~/domain/post/dto/postReaction.dto';

@Entity()
@Unique('ux-userId-postId', ['postId', 'userId'])
export class PostReactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Index('ix-postId')
  @Column({ type: 'int' })
  postId: number;

  @ManyToOne(() => PostEntity, (postEntity) => postEntity.reactions)
  @JoinColumn({ name: 'postId' })
  post: PostEntity;

  @Column({
    type: 'varchar',
    length: 2,
    default: ReactionType.LIKE,
  })
  reaction: ReactionType;

  @CreateDateColumn({
    type: 'datetime',
  })
  createdAt: Date;
  toDto(): PostReactionDto {
    // https://github.com/typestack/class-transformer
    return plainToInstance(PostReactionDto, instanceToPlain(this));
  }
}
