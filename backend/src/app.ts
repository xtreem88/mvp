import { Sequelize } from 'sequelize';

import express = require('express');
import cors = require('cors');
import logger = require('morgan');

import Database from './database';
import { IndexRoute } from './routes';
const expressSwagger = require('express-swagger-ui-generator');
import bodyParser = require('body-parser')


class App {
  public express: express.Application;
  public sequelize: Sequelize;
  public swagger: any;

  public constructor() {
    this.express = express();
    this.swagger = expressSwagger(this.express)
    this.database();
    this.middlewares();
    this.routes();
  }

  private database(): void {
    this.sequelize = new Database().sequelize;
  }

  private middlewares(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(cors());
  }

  private routes(): void {
    let options = {
      swaggerDefinition: {
          info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
          },
          host: 'localhost:3000',
          basePath: '/api/v1',
          produces: [
            'application/json',
          ],
          schemes: ['http'],
          securityDefinitions: {
            JWT: {
              type: 'apiKey',
              in: 'header',
              name: 'Authorization',
              description: '',
            }
          }
      },
      basedir: __dirname,
      files: ['./modules/**/*.router.ts']
    };

    this.swagger(options)
    this.express.use('/', new IndexRoute().router);
  }
}
export default new App();
