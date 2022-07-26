/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Router } from 'express';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { plural } from 'pluralize';

import { name, version } from '../package.json';

import auth from './middlewares/auth';
import AuthRouter from './modules/auth/auth.router';
import UserRouter from './modules/user/user.router';
import ProdRouter from './modules/product/product.router';
import VendRouter from './modules/vending/vending.router';

import { getDirectories } from './common/utils/functions';

const env = process.env.NODE_ENV || 'development';
const prefix = env == 'development' ? '' : 'build/';

export class IndexRoute {
  public router: Router = Router();
  public exceptModules: string[] = ['auth'];

  public constructor() {
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.use('/auth', AuthRouter);
    this.router.use('/api/v1/users', auth.verifyAuth, UserRouter);
    this.router.use('/api/v1/products', auth.verifyAuth, ProdRouter);
    this.router.use('/api/v1/vending', auth.verifyAuth, VendRouter);
    this.router.all('/', (req, res): any => res.send(`${name} ${version}`));
  }

  private initApi(): void {
    const ext = env == 'development' ? '.ts' : '.js';
    let modules = getDirectories(resolve(`${prefix}src/modules`));
    modules = modules.filter(module => this.exceptModules.indexOf(module) < 0);
    modules.forEach(async module => {
      const dir = `${prefix}src/modules/${module}/${module}.router${ext}`;
      if (existsSync(resolve(dir))) {
        console.log(dir)
        this.router.use(
          `/api/v1/${plural(module)}`,
          auth.verifyAuth,
          require(`./modules/${module}/${module}.router`).default
        );
      }
    });
  };
}
