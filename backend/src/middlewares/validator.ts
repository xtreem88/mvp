/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { NextFunction, Request, Response } from 'express';
import HttpController from '../common/controllers/http';
import { validationResult } from 'express-validator';
import { errorMessages } from '../common/utils/messages';


export class ValidatorMiddleware extends HttpController {

  /**
   *
   * @param req
   * @param res
   * @param next
   */
   public validate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return this.returnBadRequest(res, errorMessages.badRequest, { errors: errors.array() });
    }

    return next();
  };

  public validateAndReturnAllowedValues = (allowedValues) => {
    return (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return this.returnBadRequest(res, errorMessages.badRequest, { errors: errors.array(), allowedValues });
      }

      return next();
    }
  }
}

export default new ValidatorMiddleware();
