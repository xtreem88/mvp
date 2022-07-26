/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { check } from 'express-validator';
import { ValidRoles } from '../../modules/user/user.model';
import { errorMessages } from './messages';
import config = require("../../../config/api");


export const userValidations = {
  login: [
    check('username').trim().escape(),
    check('password').isLength({ min: 3 }).trim().escape(),
  ],
  register: [
    check('name').notEmpty().withMessage(errorMessages.nameRequired).trim().escape(),
    check('username').notEmpty().withMessage(errorMessages.usernameRequired).trim().escape(),
    check('password').notEmpty().withMessage(errorMessages.passwordRequired).custom((value,{req}) => {
      if (value !== req.body.confirmPassword) {
        return false;
      } else {
        return value;
      }
    }).withMessage(errorMessages.passwordsNotMatch)
    .isLength({ min: 3 }).withMessage('Password Must Be at Least 3 Characters').trim().escape(),
    check('role').custom(value => ValidRoles[value]).withMessage(errorMessages.invalidRole).trim().escape(),
  ],
  userUpdate: [
    check('name').notEmpty().withMessage(errorMessages.nameRequired).trim().escape(),
  ],
  newProduct: [
    check('productName').notEmpty().withMessage(errorMessages.productNameRequired).trim().escape(),
    check('amountAvailable').notEmpty().withMessage(errorMessages.productAmountAvailableRequired)
    .isNumeric().withMessage(errorMessages.productAmountAvailableNumeric)
    .custom(value => value > 0).withMessage(errorMessages.productAmountAvailableGTZero).trim().escape(),
    check('cost').notEmpty().withMessage(errorMessages.productCostRequired)
    .isNumeric().withMessage(errorMessages.productCostNumberic)
    .custom(value => value > 0).withMessage(errorMessages.productCostGTZero).trim().escape(),
  ],
  editProduct: [
    check('productName').trim().escape(),
    check('amountAvailable').isNumeric().withMessage(errorMessages.productAmountAvailableNumeric)
    .custom(value => value > 0).withMessage(errorMessages.productAmountAvailableGTZero).trim().escape(),
    check('cost').isNumeric().withMessage(errorMessages.productCostNumberic)
    .custom(value => value > 0).withMessage(errorMessages.productCostGTZero).trim().escape(),
  ],
  deposit: [
    check('coins').notEmpty().withMessage(errorMessages.depositAmountRequired)
    .custom((value: string) => value.length > 0).withMessage(errorMessages.depositAmountRequired)
    .custom((value: string) => {
      const coins = value.split(',');
      let valid = true
      coins.forEach(val => {
        if (!config.development.allowedAmounts.includes(Number(val))) {
          valid = false
        }
      });

      return valid;
    }).withMessage(errorMessages.depositAmountInvalid).trim().escape(),
  ],
  buy: [
    check('productId').notEmpty().withMessage(errorMessages.buyProductIdRequired)
    .isNumeric().withMessage(errorMessages.buyProductIdNumberic)
    .trim().escape(),
    check('count').notEmpty().withMessage(errorMessages.buyProductCountdRequired)
    .isNumeric().withMessage(errorMessages.buyProductCountNumberic)
    .custom(value => value > 0).withMessage(errorMessages.buyProductCountGTZero)
    .trim().escape()
  ],
}
