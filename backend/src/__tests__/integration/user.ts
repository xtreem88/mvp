/* eslint-disable @typescript-eslint/explicit-function-return-type */
import 'jest';
import * as express from 'express';
import * as request from 'supertest';

import IntegrationHelpers from '../../test-helpers/Integration-helpers';
import { HTTP } from '../../common/constants/http';
import { createRandomUser } from '../../test-helpers/user-data';

describe('status integration tests', () => {
  let app: express.Application;
  let token = '';
  let user: any;
  beforeAll(async() => {
    app = await IntegrationHelpers.getApp();

    const payload = createRandomUser('buyer')
    await request(app)
    .post('/auth/register')
    .set('Accept', 'application/json')
    .send(payload)
    .expect((res: request.Response) => {
      user = res.body.auth_user;
      expect(res.body.auth_user.role === 'buyer')
      expect(res.body.auth_user.username === 'Crawford.Maggio')
      expect(res.body.auth_user.deposit === 0)
    })
    .expect(HTTP.OK);


    const data = {
      "username": payload.username,
      "password": payload.password
    }
    await request(app)
    .post('/auth/token')
    .set('Accept', 'application/json')
    .send(data)
    .then((res: request.Response) => {
      token = res.body.access_token.token;
    });

  });

  afterEach(async () => {
    await new Promise((r) => setTimeout(r, 1000));
  })

  afterAll(async () => {
    await request(app)
    .delete('/api/v1/users/' + user.id)
    .set('Accept', 'application/json')
    .set('Authorization', token)
    .expect((res: request.Response) => {
      expect(res.body.message === 'User successfully deleted')
    })
    .expect(HTTP.OK);
    await new Promise((r) => setTimeout(r, 1000));
  })

  it('can get users', async () => {
    await request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .expect(HTTP.OK)
      .expect((res: request.Response) => {
        expect(res.body.count > 0);
        expect(res.body.rows.length > 0);
      });
  });

  it('can get user by id', async () => {
    await request(app)
      .get('/api/v1/users/' + user.id)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .expect((res: request.Response) => {
        expect(res.body.id === user.id);
      })
      .expect(HTTP.OK);
  });

  it('can edit user', async () => {
    await request(app)
    .put('/api/v1/users/' + user.id)
    .set('Accept', 'application/json')
    .set('Authorization', token)
    .send({
      name: 'Testing'
    })
    .expect((res: request.Response) => {
      expect(res.body.name === 'Testing');
    })
    .expect(HTTP.OK);
  });
});
