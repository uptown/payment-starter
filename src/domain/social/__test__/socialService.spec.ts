import { Test } from '@nestjs/testing';
import { InMemoryTypeOrmModule } from '~/infrastructure/forTest/inMemoryTypeOrmModule';
import { SocialService } from '~/domain/social/social.service';
import { SocialDomainModule } from '~/domain/social/socialDomain.module';
import * as assert from 'assert';

describe('socialService', () => {
  let socialService: SocialService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [InMemoryTypeOrmModule, SocialDomainModule],
    }).compile();

    socialService = moduleRef.get(SocialService);
  });
  it('follow and unfollow', async () => {
    await socialService.createFollow({ fromUserId: 1, toUserId: 2 });
    await socialService.createFollow({ fromUserId: 1, toUserId: 3 });

    const followers = await socialService
      .findFollowerIdsByUserId(2)
      .then((v) => v.getOrThrow());

    assert.equal(followers.length, 1);

    const followings = await socialService
      .findFollowingIdsByUserIds(1)
      .then((v) => v.getOrThrow());

    assert.equal(followings.length, 2);

    await socialService.deleteFollow({ fromUserId: 1, toUserId: 3 });

    const followings2 = await socialService
      .findFollowingIdsByUserIds(1)
      .then((v) => v.getOrThrow());

    assert.equal(followings2.length, 1);
  });
});
