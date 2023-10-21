import { UserService } from '~/domain/user/user.service';
import { Test } from '@nestjs/testing';
import { InMemoryTypeOrmModule } from '~/infrastructure/forTest/inMemoryTypeOrmModule';
import { UserDomainModule } from '~/domain/user/userDomain.module';
import * as assert from 'assert';
import { DataConflictError } from '~/@shared/errors/@domain/dataConflictError';

describe('userService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [InMemoryTypeOrmModule, UserDomainModule],
    }).compile();

    userService = moduleRef.get(UserService);
  });
  it('create User and Find', async () => {
    const created = (
      await userService.createUser({
        email: 'test@test.com',
        password: '12341234',
      })
    ).getOrThrow();
    assert.equal(
      (await userService.findOne(created.id)).getOrThrow().email,
      created.email,
    );
  });
  it('can catch email duplicated', async () => {
    (
      await userService.createUser({
        email: 'test2@test.com',
        password: '12341234',
      })
    ).getOrThrow();
    const error = (
      await userService.createUser({
        email: 'test2@test.com',
        password: '12341234',
      })
    ).exception();
    assert.equal(error instanceof DataConflictError, true);
  });
  it('password should be hashed', async () => {
    const user = (
      await userService.createUser({
        email: 'test3@test.com',
        password: '12341234',
      })
    ).getOrThrow();
    assert.notEqual(user.passwordHash, '12341234');
  });
});
