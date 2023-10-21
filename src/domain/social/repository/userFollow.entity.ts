import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UserFollowDto } from '~/domain/social/dto/userFollow.dto';

@Entity()
@Unique('ux-fromUserId-toUserId', ['fromUserId', 'toUserId'])
export class UserFollowEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int' })
  fromUserId: number;

  @Index('ix-toUserId')
  @Column({ type: 'varchar', length: 100 })
  toUserId: number;
  @CreateDateColumn({
    type: 'datetime',
  })
  createdAt: Date;

  toDto(): UserFollowDto {
    // https://github.com/typestack/class-transformer
    return plainToInstance(UserFollowDto, instanceToPlain(this));
  }
}
