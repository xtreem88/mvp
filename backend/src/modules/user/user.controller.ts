import UserService from './user.service';
import CrudController from '../../common/controllers/crud';
import User from './user.model';
import { Request, Response } from 'express';

import { errorMessages } from '../../common/utils/messages';

export class UserController extends CrudController {
  public service = UserService;

  public updateUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { name, password } = req.body;
      const {id} = req.params

      const user = await User.scope('withPassword').findOne({
        where: { id }
      });
      if (!user) return this.returnBadRequest(res, errorMessages.invalidUser);

      await User.update({ name, password }, {where: {id: user.id}});
      return this.returnData(res, {
        auth_user: await User.scope('getUsers').findOne({ where: { id: user.id }})
      });
    } catch (err) {
      return this.returnServerError(res, errorMessages.serverError);
    }
  };
}

export default new UserController();
