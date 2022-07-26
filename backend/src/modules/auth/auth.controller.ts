import { Request, Response } from 'express';
import { compare, hash } from 'bcryptjs';

import HttpController from '../../common/controllers/http';
import User from '../user/user.model';
import AuthService from './auth.service';
import { errorMessages } from '../../common/utils/messages';

export class AuthController extends HttpController {
  public service = AuthService;

  public authenticate = async (
    req: Request,
    res: Response
  ): Promise<Response> => {

    let messageError = 'Invalid username or password.';
    try {
      const { username, password } = req.body;

      const user = await User.scope('withPassword').findOne({
        where: { username }
      });
      if (!user) return this.returnUnauthorized(res, messageError);

      const match = await compare(password.toString(), user.password);
      if (!match) return this.returnUnauthorized(res, messageError);

      const access_token = await this.service.generateToken(username);

      return this.returnData(res, {
        access_token,
        auth_user: await User.scope('getUsers').findOne({ where: { username } })
      });
    } catch (err) {
      return this.returnServerError(res,errorMessages.serverError);
    }
  };

  public authState = async (
    req: Request,
    res: Response
  ): Promise<Response> => {

    try {
      const {user, expires} = await this.getAuthUserState(req);
      const token = this.getToken(req);

      if (!user) return this.returnUnauthorized(res, 'Invalid token');

      return this.returnData(res, {
        access_token: {
          expires_in: expires,
          token
        },
        auth_user: await User.scope('getUsers').findOne({ where: { id: user.id } })
      });
    } catch (err) {
      console.log(err)
      return this.returnServerError(res, errorMessages.serverError);
    }
  };

  public register = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { username, password, name, role } = req.body;

      let user = await User.scope('withPassword').findOne({
        where: { username }
      });
      if (user) return this.returnBadRequest(res, errorMessages.userExists);

      user = await User.create({ name, username, role, password, deposit: 0 })
      return this.returnData(res, {
        auth_user: await User.scope('getUsers').findOne({ where: { id: user.id }})
      });
    } catch (err) {
      return this.returnServerError(res, errorMessages.serverError);
    }
  };

  public forgotPassword = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { username } = req.body;

      const user = await User.scope('withPassword').findOne({
        where: { username }
      });
      if (!user) return this.returnBadRequest(res, 'Invalid User!');

      //creating reset token
      // const resetToken = await this.service.createResetToken(username);

      //sending username
      // await this.service.sendForgotPasswordEmail(username, resetToken);

      return this.returnMessage(
        res,
        'Password recovery email sent successfully!'
      );
    } catch (err) {
      return this.returnServerError(res, err.message);
    }
  };

  public resetPassword = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { token, password, confirm_password } = req.body;

      if (!token) return this.returnBadRequest(res, 'Invalid token!');
      if (password !== confirm_password)
        return this.returnBadRequest(res, 'Passwords do not match.');

      const user = await User.scope('resetPassword').findOne({
        where: { reset_password_token: token }
      });
      if (!user) return this.returnBadRequest(res, 'Invalid token!');

      const now = new Date();
      if (now > user.reset_password_expires)
        return this.returnBadRequest(res, 'Token expired!');

      await User.update(
        {
          password: await hash(password, 10),
          reset_password_expires: now.setHours(now.getHours() - 24)
        },
        { where: { id: user.id } }
      );

      return this.returnMessage(res, 'Password updated successfully!');
    } catch (err) {
      return this.returnServerError(res, err.message);
    }
  };
}

export default new AuthController();
