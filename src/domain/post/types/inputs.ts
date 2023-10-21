import { ReactionType } from '~/domain/post/dto/reactionType';

export type PostCreationType = {
  userId: number;
  title: string;
  description: string;
};

export type PostReactionCreationType = {
  userId: number;
  postId: number;
  reaction: ReactionType;
};

export type PostReactionDeletionType = {
  userId: number;
  postId: number;
};
