import { INestApplication } from '@nestjs/common';
import { createE2ETestApp } from '~/infrastructure/forTest/createE2ETestApp';
import { createE2ETestUser } from '~/infrastructure/forTest/createE2ETestUser';
import { UserResponse } from '~/interfaces/@response/user.response';
import * as request from 'supertest';
import * as assert from 'assert';

describe('PostsController', () => {
  let app: INestApplication;
  let me: UserResponse;
  let accessToken: string;
  let otherAccessToken: string;
  let postId: number;
  beforeAll(async () => {
    app = await createE2ETestApp();
    ({ me, accessToken } = await createE2ETestUser(app));
    ({ accessToken: otherAccessToken } = await createE2ETestUser(app));
  });

  it('write Post', async () => {
    const response = await request(app.getHttpServer())
      .post('/posts')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        title: 'Title',
        description: 'Description',
      })
      .expect(201);
    postId = response.body.id;
    assert.equal(response.body.title, 'Title');
    assert.equal(response.body.description, 'Description');
    assert.equal(response.body.user.email, me.email);
  });

  it('cannot write Post', async () => {
    await request(app.getHttpServer())
      .post('/posts')
      .send({
        title: 'Title',
        description: 'Description',
      })
      .expect(401);
  });

  it('read post', async () => {
    const response = await request(app.getHttpServer())
      .get('/posts/' + postId)
      .expect(200);
    assert.equal(response.body.title, 'Title');
    assert.equal(response.body.description, 'Description');
    assert.equal(response.body.user.email, me.email);
  });
  it('cannot delete post', async () => {
    await request(app.getHttpServer())
      .delete('/posts/' + postId)
      .set({ Authorization: `Bearer ${otherAccessToken}` })
      .expect(403);
  });
  it('delete post', async () => {
    await request(app.getHttpServer())
      .delete('/posts/' + postId)
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(200);
  });
  it('bad post id', async () => {
    await request(app.getHttpServer()).get('/posts/asd').expect(400);
  });
  it('not found post id', async () => {
    await request(app.getHttpServer()).get('/posts/99999999').expect(404);
  });

  afterAll(() => app.close());
});
