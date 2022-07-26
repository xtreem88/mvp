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
  let token2 = '';
  let user: any;
  let seller: any;
  let prodId = '';
  beforeAll(async() => {
    app = await IntegrationHelpers.getApp();

    const payload = createRandomUser('buyer')
    await request(app)
    .post('/auth/register')
    .set('Accept', 'application/json')
    .send(payload)
    .then(res => {
      user = res.body.auth_user;
    });

    const payload2 = createRandomUser('seller')
    await request(app)
    .post('/auth/register')
    .set('Accept', 'application/json')
    .send(payload2)
    .then(res => {
      seller = res.body.auth_user;
    });


    let data = {
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

    data = {
      "username": payload2.username,
      "password": payload2.password
    }
    await request(app)
    .post('/auth/token')
    .set('Accept', 'application/json')
    .send(data)
    .then((res: request.Response) => {
      token2 = res.body.access_token.token;
    });

    await request(app)
    .post('/api/v1/products')
    .set('Accept', 'application/json')
    .set('Authorization', token2)
    .send({
      "amountAvailable": 20,
      "cost": 25,
      "productName": "Product1_test",
    })
    .then((res: request.Response) => {
      console.log(res.body)
      prodId = res.body.data.id;
    });
  });

  beforeEach(async () => {
    await request(app)
      .get('/api/v1/users/' + user.id)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .then((res: request.Response) => {
        user = res.body;
      });
  })

  afterEach(async () => {
    await new Promise((r) => setTimeout(r, 1000));
  })

  afterAll(async () => {
    await request(app)
    .delete('/api/v1/users/' + user.id)
    .set('Accept', 'application/json')
    .set('Authorization', token)

    await new Promise((r) => setTimeout(r, 1000));
  })

  describe('deposit', () => {
    it('can deposit', async () => {
      await request(app)
        .post('/api/v1/vending/deposit')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send({
          "coins": "5,20,10,20,50"
        })
        .expect((res: request.Response) => {
          expect(res.body.auth_user.deposit === (user.deposit + 105))
        })
        .expect(HTTP.OK);
    });

    it('should return error when wrong coin is used', async () => {
      await request(app)
        .post('/api/v1/vending/deposit')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send({
          "coins": "5,14,10,20,50"
        })
        .expect((res: request.Response) => {
          expect(res.body.data.errors.length === 1)
          expect(res.body.data.errors[0].msg === 'Deposit amount must be one of the allowed values')
        })
        .expect(HTTP.BAD_REQUEST);
    });
  })


  describe('deposit', () => {
    beforeEach(async () => {
      await request(app)
      .post('/api/v1/vending/reset')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .expect(HTTP.OK);

      await request(app)
      .post('/api/v1/vending/deposit')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        "coins": "5,20,10,20,50"
      })
      .expect(HTTP.OK);
    })

    it('can buy', async () => {
      const expectedChange = [ 50, 5 ]
      await request(app)
        .post('/api/v1/vending/buy')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send({
          "productId": prodId,
          "count": 2
        })
        .expect((res: request.Response) => {
          expect(res.body.change.join(',') === expectedChange.join(','))
          expect(res.body.balance === 0)
        })
        .expect(HTTP.OK);
    });
  })

});
