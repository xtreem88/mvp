import { CrudRoute } from './../../common/classes/crud-route';
import controller from './vending.controller';
import { Router } from 'express';
import { userValidations } from '../../common/utils/validations';
import validator from '../../middlewares/validator';
import auth from '../../middlewares/auth';
import config = require('../../../config/api');

export class VendingRoute extends CrudRoute {
  public router: Router = Router();
  public controller = controller;

  public constructor() {
    super();
    this.init();
  }

  public init(): void {
    /**
     * This function comment is parsed by doctrine
     * @route Get /vendings/meta
     * @group Vending
     * @produces application/json
     * @returns {object} 200
     * @returns {Error}  default - Unexpected error
     * @security JWT
    */
    this.router.get('/meta', controller.meta);

    /**
     * @typedef Deposit
     * @property {string} coins
    */
    /**
     * This function comment is parsed by doctrine
     * @route POST /vendings/deposit
     * @group Vending
     * @produces application/json
     * @param {Deposit.model} deposit.body.required
     * @returns {object} 200 - Vending
     * @returns {Error}  default - Unexpected error
     * @security JWT
    */
      this.router.post('/deposit', userValidations.deposit, auth.verifyBuyerRole,
      validator.validateAndReturnAllowedValues(config.development.allowedAmounts), controller.deposit);

    /**
     * @typedef Buy
     * @property {number} productId
     * @property {number} count
    */
    /**
     * This function comment is parsed by doctrine
     * @route POST /vendings/buy
     * @group Vending
     * @produces application/json
     * @param {Buy.model} product.body.required
     * @returns {object} 200 - Vending
     * @returns {Error}  default - Unexpected error
     * @security JWT
    */
      this.router.post('/buy', userValidations.buy, auth.verifyBuyerRole, validator.validate, controller.buy);

    /**
     * This function comment is parsed by doctrine
     * @route POST /vendings/reset
     * @group Vending
     * @produces application/json
     * @returns {object} 200 - Vending
     * @returns {Error}  default - Unexpected error
     * @security JWT
    */
      this.router.post('/reset', auth.verifyBuyerRole, controller.store);
    }
}

export default new VendingRoute().router;
