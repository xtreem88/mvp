import controller from './auth.controller';
import { Router } from 'express';
import { userValidations } from '../../common/utils/validations';
import validator from '../../middlewares/validator';

export class AuthRouter {
  public controller = controller;
  public router: Router = Router();

  public constructor() {
    this.init();
  }

  public init(): void {
    this.router.post('/token', userValidations.login, controller.authenticate);
    this.router.post('/auth-state', userValidations.login, controller.authState);
    this.router.post('/register', userValidations.register, validator.validate, controller.register);
    this.router.post('/forgot-password', controller.forgotPassword);
    this.router.post('/reset-password', controller.resetPassword);
    this.router.post('/logout', controller.logout);
  }
}

export default new AuthRouter().router;
