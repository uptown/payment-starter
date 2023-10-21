import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { UserResponse } from '~/interfaces/@response/user.response';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

export const createE2ETestUser = async (app: INestApplication) => {
  const email = randomStringGenerator() + '@nextunicorn.kr';
  await request(app.getHttpServer())
    .post('/users')
    .send({
      email,
      password: 'password',
    })
    .expect(201);
  const response = await request(app.getHttpServer())
    .post('/auth/sessions')
    .send({
      email,
      password: 'password',
    })
    .expect(201);

  const accessToken: string = response.body.accessToken;

  const userMeResponse = await request(app.getHttpServer())
    .get('/users/me')
    .set({ Authorization: `Bearer ${accessToken}` })
    .expect(200);
  const userMe = userMeResponse.body as UserResponse;

  return {
    me: userMe,
    accessToken,
  };
};
