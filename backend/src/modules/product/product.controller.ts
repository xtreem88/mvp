import ProductService from './product.service';
import CrudController from '../../common/controllers/crud';
import { Request, Response } from 'express';

export class ProductController extends CrudController {
  public service = ProductService;

  /**
   * store method
   *
   * @param req
   * @param res
   */
   public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {productName, amountAvailable, cost} = req.body;
      const authUser = res.locals.authUser;
      const created = await this.service.create({
        productName,
        amountAvailable,
        cost,
        sellerId: authUser.id
      });
      if (created)
        return this.returnCreated(
          res,
          created,
          `${this.service.modelName} successfully created.`
        );

      return this.returnBadRequest(
        res,
        `Error while creating ${this.service.modelName}`
      );
    } catch (err) {
      return this.processException(res, err);
    }
  };
}

export default new ProductController();
