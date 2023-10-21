import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as assert from 'assert';
import { createE2ETestApp } from '~/infrastructure/forTest/createE2ETestApp';

describe('UsersController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createE2ETestApp();
  });

  describe('user login test', () => {
    let accessToken: string;
    it('POST /users', () =>
      request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'test@nextunicorn.kr',
          password: 'password',
        })
        .expect(201));
    it('POST /users (409)', () =>
      request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'test@nextunicorn.kr',
          password: 'password',
        })
        .expect(409));
    it('POST /users (400)', () =>
      request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'test2@nextunicorn.kr',
          password: '1234',
        })
        .expect(400));

    it('POST /auth/sessions', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/sessions')
        .send({
          email: 'test@nextunicorn.kr',
          password: 'password',
        })
        .expect(201);
      accessToken = response.body.accessToken;
    });

    it('POST /auth/sessions (400)', async () => {
      await request(app.getHttpServer())
        .post('/auth/sessions')
        .send({
          email: 'test@nextunicorn.kr',
          password: 'password222',
        })
        .expect(400);
    });

    it('GET /users/me', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/me')
        .set({ Authorization: `Bearer ${accessToken}` })
        .expect(200);
      assert.equal(response.body.email, 'test@nextunicorn.kr');
    });
    it('GET /users/me (401)', async () => {
      await request(app.getHttpServer()).get('/users/me').expect(401);
    });
  });
  describe('user following test', () => {
    let accessToken: string;
    let otherId: number;
    it('POST /users', () =>
      request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'test4@nextunicorn.kr',
          password: 'password',
        })
        .expect(201));
    it('POST /users other', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'test5@nextunicorn.kr',
          password: 'password',
        })
        .expect(201);
      otherId = response.body.id;
    });
    it('POST /auth/sessions', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/sessions')
        .send({
          email: 'test4@nextunicorn.kr',
          password: 'password',
        })
        .expect(201);
      accessToken = response.body.accessToken;
    });

    it('POST /users/:id/followings', async () => {
      await request(app.getHttpServer())
        .post('/users/' + otherId + '/followings')
        .set({ Authorization: `Bearer ${accessToken}` })
        .expect(201);
    });
    it('GET /users/me/followings', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/me/followings')
        .set({ Authorization: `Bearer ${accessToken}` })
        .expect(200);
      assert.equal(response.body.length, 1);
    });
    it('GET /users/me/followers', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/me/followers')
        .set({ Authorization: `Bearer ${accessToken}` })
        .expect(200);
      assert.equal(response.body.length, 0);
    });
    it('GET /users/:id/followers', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/${otherId}/followers`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .expect(200);
      assert.equal(response.body.length, 1);
    });

    it('DELETE /users/:id/followings', async () => {
      await request(app.getHttpServer())
        .delete('/users/' + otherId + '/followings')
        .set({ Authorization: `Bearer ${accessToken}` })
        .expect(200);
    });
    it('GET /users/:id/followings', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/me/followings')
        .set({ Authorization: `Bearer ${accessToken}` })
        .expect(200);
      assert.equal(response.body.length, 0);
    });
  });

  afterAll(() => app.close());
});
