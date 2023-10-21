import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { PostDto } from '~/domain/post/dto/post.dto';
import { PostReactionEntity } from '~/domain/post/repository/postReaction.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Index('ix-userId')
  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text', length: 5000 })
  description: string;

  @OneToMany(
    () => PostReactionEntity,
    (postReactionEntity) => postReactionEntity.post,
  )
  reactions: PostReactionEntity[];

  @CreateDateColumn({
    type: 'datetime',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
  })
  updatedAt: Date;

  toDto(): PostDto {
    // https://github.com/typestack/class-transformer
    return plainToInstance(PostDto, instanceToPlain(this));
  }
}
