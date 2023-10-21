import * as assert from 'assert';
import asyncOnce from '~/infrastructure/utils/async/asyncOnce';

describe('asyncOnce test', () => {
  it('should execute once', async () => {
    let i = 0;
    const plusI = asyncOnce(async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          i += 1;
          resolve(null);
        }, 10);
      });
    });

    await plusI();
    assert.equal(i, 1);
    await plusI();
    assert.equal(i, 1);
    await plusI();
    assert.equal(i, 1);
  });
});
