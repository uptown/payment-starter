import { ReactionType } from '~/domain/post/dto/reactionType';

export class PostReactionDto {
  id: number;
  userId: number;
  postId: number;
  reaction: ReactionType;
  createdAt: Date;
}
