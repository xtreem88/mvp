import VendingService from './vending.service';
import CrudController from '../../common/controllers/crud';
import { Request, Response } from 'express';
import User from '../user/user.model';
import { errorMessages } from '../../common/utils/messages';
import config = require('../../../config/api');
import Product from '../product/product.model';
import app from '../../app';


export class VendingController extends CrudController {
  public service = VendingService;

  public deposit = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { coins } = req.body;
      const authUser = res.locals.authUser;

      if (!authUser) return this.returnBadRequest(res, errorMessages.invalidUser);

      const user = await User.scope('getUsers').findOne({ where: { id: authUser.id }})
      let amount: string[] = coins.split(',');
      const total: number = amount.reduce((a, b) => Number(a) + Number(b), 0) + Number(user.deposit || 0)

      await User.update({deposit: total}, {where: {id: authUser.id}});
      return this.returnData(res, {
        auth_user: await User.scope('getUsers').findOne({ where: { id: authUser.id }})
      });
    } catch (err) {
      return this.returnServerError(res, errorMessages.serverError);
    }
  };

  public buy = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const t = await app.sequelize.transaction();
    try {
      let { productId, count } = req.body;
      const authUser = res.locals.authUser;
      count = Number(count) || 0

      if (!authUser) return this.returnBadRequest(res, errorMessages.invalidUser);

      const user = await User.scope('getUsers').findOne({ where: { id: authUser.id }});
      const product = await Product.scope('getProducts').findOne({ where: { id: productId } });
      const total = product.cost * count;

      if (!product) return this.returnBadRequest(res, errorMessages.productNotFound);
      if (product.amountAvailable < count) return this.returnBadRequest(res, errorMessages.productNotEnough, {product, balance: user.deposit});
      if (user.deposit < (total)) return this.returnBadRequest(res, errorMessages.insufficientDeposit, {product, balance: user.deposit});

      let change = user.deposit - total;

      await User.update({deposit: 0}, {where: {id: authUser.id}});
      await Product.update({amountAvailable: (product.amountAvailable - count)}, {where: {id: productId}});
      await t.commit();
      return this.returnData(res, {
        total,
        product,
        change: this.calculateChange(change)
      });
    } catch (err) {
      await t.rollback();
      return this.returnServerError(res, errorMessages.serverError);
    }
  };

  public meta = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    return this.returnData(res, {
      allowedAmounts: config.development.allowedAmounts
    });
  };

  public reset = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const authUser = res.locals.authUser;

      if (!authUser) return this.returnBadRequest(res, errorMessages.invalidUser);

      await User.update({deposit: 0}, {where: {id: authUser.id}});
      return this.returnData(res, {
        auth_user: await User.scope('getUsers').findOne({ where: { id: authUser.id }})
      });
    } catch (err) {
      return this.returnServerError(res, errorMessages.serverError);
    }
  };

  private calculateChange = (amount): number[] => {
    let remainingAmount = amount;
    const result = [];
    const changes = config.development.allowedAmounts.sort((a, b) => (b - a))
    for (const change of changes) {
      const count = Math.floor(remainingAmount / change);
      if(count) {
        for (let index = 0; index < count; index++) {
          result.push(change);
        }

      }

      remainingAmount %= change;
    }

    return result;
  }
}

export default new VendingController();
