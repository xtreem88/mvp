import chalk from 'chalk';
import {
  ValidationErrorItem,
  ValidationError,
  UniqueConstraintError
} from 'sequelize';

import { HTTP } from '../constants/http';
import { ResponseError } from '../interfaces/response-error';
import { ResponseErrors } from '../interfaces/response-errors';
import { ErrorDetail } from '../interfaces/error-detail';

export abstract class ErrorHandler {
  /**
   * @param error
   *
   */
  public handleUnknownError(
    error: Error
  ): { errorData: ResponseError; statusCode: number } {
    console.log(chalk.bgRed(chalk.whiteBright('UNKNOWN ERROR: ')), error);

    return {
      errorData: {
        code: HTTP.INTERNAL_SERVER_ERROR,
        message: error.message
      },
      statusCode: HTTP.INTERNAL_SERVER_ERROR
    };
  }

  /**
   * @param error
   */
  public handleValidationError(
    error: ValidationError
  ): { errorData: ResponseErrors; statusCode: number } {
    const errors: ErrorDetail[] = [];

    error.errors.forEach((errorItem: ValidationErrorItem): void => {
      errors.push({
        type: 'invalid',
        field: errorItem.path,
        message: `Field ${errorItem.path} is not valid.`
      });
    });

    return {
      errorData: {
        errors
      },
      statusCode: HTTP.UNPROCESSABLE_ENTITY
    };
  }

  /**
   * @param error
   */
  public handleUniqueConstraintError(
    error: UniqueConstraintError
  ): { errorData: ResponseErrors; statusCode: number } {
    const errors: ErrorDetail[] = [];

    error.errors.forEach((errorItem: ValidationErrorItem): void => {
      errors.push({
        type: 'duplicated',
        field: errorItem.path,
        message: `Field ${errorItem.path} already exists.`
      });
    });

    return {
      errorData: {
        errors
      },
      statusCode: HTTP.UNPROCESSABLE_ENTITY
    };
  }
}
