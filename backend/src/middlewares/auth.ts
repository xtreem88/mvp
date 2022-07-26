import { NextFunction, Request, Response } from 'express';
import { ValidRoles } from '../modules/user/user.model';
import HttpController from '../common/controllers/http';

export class AuthMiddleware extends HttpController {

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  public verifyAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const authUser = await this.getAuthUser(req);

      if (authUser) {
        res.locals = { authUser };
        return next();
      } else {
        return this.returnUnauthorized(res);
      }
    } catch (err) {
      return this.returnUnauthorized(res, err.message);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @param next
   */
   public verifyBuyerRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const authUser = await this.getAuthUser(req);

      if (authUser && authUser.role === ValidRoles.buyer) {
        return next();
      } else {
        return this.returnUnauthorized(res);
      }
    } catch (err) {
      return this.returnUnauthorized(res, err.message);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @param next
   */
   public verifySellerRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const authUser = await this.getAuthUser(req);

      if (authUser && authUser.role === ValidRoles.seller) {
        return next();
      } else {
        return this.returnUnauthorized(res);
      }
    } catch (err) {
      return this.returnUnauthorized(res, err.message);
    }
  };
}

export default new AuthMiddleware();
