import * as assert from 'assert';
import { convertPasswordToPasswordHash } from '~/infrastructure/utils/password/convertPasswordToPasswordHash';
import { validatePasswordWithHash } from '~/infrastructure/utils/password/validatePasswordWithHash';

describe('password test', () => {
  it('check password hash and validate', async () => {
    const hashed = await convertPasswordToPasswordHash('testpassword');

    assert.ok(await validatePasswordWithHash('testpassword', hashed));
    assert.ok(!(await validatePasswordWithHash('testPassword', hashed)));
  });
});
