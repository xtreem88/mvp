import { CrudRoute } from './../../common/classes/crud-route';
import controller from './product.controller';
import { Router } from 'express';
import { userValidations } from '../../common/utils/validations';
import validator from '../../middlewares/validator';
import auth from '../../middlewares/auth';

export class ProductRoute extends CrudRoute {
  public router: Router = Router();
  public controller = controller;

  public constructor() {
    super();
    this.init();
  }

  public init(): void {
     /**
     * This function comment is parsed by doctrine
     * @route Get /products/
     * @group Products
     * @produces application/json
     * @param {string} search.query - filter by username
     * @param {string} page.query - set page
     * @param {string} sort.query - set sort
     * @param {string} limit.query - set limit
     * @param {string} order.query - set order
     * @returns {object} 200 - Products
     * @returns {Error}  default - Unexpected error
     * @security JWT
    */
      this.router.get('/', controller.index);

      /**
       * This function comment is parsed by doctrine
       * @route Get /products/{id}
       * @group Products
       * @produces application/json
       * @param {string} id.path - product ID
       * @returns {object} 200 - Products
       * @returns {Error}  default - Unexpected error
       * @security JWT
      */
       this.router.get('/:id', controller.get);

       /**
       * @typedef Product
       * @property {string} productName
       * @property {string} amountAvailable
       * @property {string} cost
       */

      /**
       * This function comment is parsed by doctrine
       * @route POST /products
       * @group Products
       * @produces application/json
       * @param {Product.model} product.body.required - new product details
       * @returns {object} 200 - Products
       * @returns {Error}  default - Unexpected error
       * @security JWT
      */
       this.router.post('/', userValidations.newProduct, auth.verifySellerRole, validator.validate, controller.store);

      /**
       * This function comment is parsed by doctrine
       * @route PUT /products/{id}
       * @group Products
       * @produces application/json
       * @param {string} id.path - product ID
       * @param {Product.model} product.body.required - new product details
       * @returns {object} 200 - Products
       * @returns {Error}  default - Unexpected error
       * @security JWT
      */
       this.router.put('/:id', userValidations.editProduct, auth.verifySellerRole, validator.validate, controller.update);

       /**
       * This function comment is parsed by doctrine
       * @route DELETE /products/{id}
       * @group Products
       * @produces application/json
       * @param {string} id.path - product ID
       * @returns {object} 200 - Products
       * @returns {Error}  default - Unexpected error
       * @security JWT
      */
        this.router.delete('/:id', auth.verifySellerRole, controller.delete);
    }
}

export default new ProductRoute().router;
