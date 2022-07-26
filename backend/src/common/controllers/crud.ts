import { Request, Response } from 'express';
import { CrudService } from '../services/crud';
import { PaginateOptions } from '../interfaces/paginate-options';
import HttpController from './http';
import config = require('../../../config/api');

export default abstract class CrudController extends HttpController {
  abstract service: CrudService;

  private _defaultFindOptions: PaginateOptions = {
    limit: config.development.pageItemCount,
    page: 1,
    order: 'ASC',
    sort: 'id'
  };

  public get defaultFindOptions(): PaginateOptions {
    return this._defaultFindOptions;
  }

  public set defaultFindOptions(options: PaginateOptions) {
    this._defaultFindOptions = { ...this._defaultFindOptions, ...options };
  }

  /**
   * get method
   *
   * @param req
   * @param res
   */
  public get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id;
      if (!id)
        return this.returnBadRequest(
          res,
          `Invalid ${this.service.modelName} ID.`
        );
      return this.returnData(res, await this.service.get(id));
    } catch (err) {
      return this.processException(res, err);
    }
  };

  /**
   * list all method
   *
   * @param req
   * @param res
   */
  public index = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (req.query.list)
        return this.returnData(res, await this.service.list());
      const options = await this.buildOptions(req.query);
      return this.returnData(res, await this.service.all(options));
    } catch (err) {
      return this.processException(res, err);
    }
  };
  /**
   * store method
   *
   * @param req
   * @param res
   */
  public store = async (req: any, res: any): Promise<Response> => {
    try {
      const created = await this.service.create(req.body);
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

  /**
   * update method
   *
   * @param req
   * @param res
   */
  public update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    if (!id)
      return this.returnNotFound(
        res,
        `Invalid ${this.service.modelName} ID`
      );

    try {
      if (await this.service.update(req.body, id))
        return this.return(
          res,
          await this.service.get(id),
          `${this.service.modelName} successfully updated`
        );

      return this.returnServerError(
        res,
        `Error updating ${this.service.modelName}.`
      );
    } catch (err) {
      return this.processException(res, err);
    }
  };
  /**
   * delete method
   *
   * @param req
   * @param res
   */
  public delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    if (!id)
      return this.returnNotFound(
        res,
        `Invalid ${this.service.modelName} ID`
      );

    try {
      if (await this.service.delete(id))
        return this.returnMessage(
          res,
          `${this.service.modelName} successfully deleted`
        );

      return this.returnBadRequest(
        res,
        `Error deleting ${this.service.modelName}`
      );
    } catch (err) {
      return await this.processException(res, err);
    }
  };

  /**
   *
   * @param query
   */
  public buildOptions = async (query: any): Promise<{}> => {
    //clean query options
    for (let key in query) {
      if (query[key] === '') delete query[key];
    }

    //merge default options
    query = { ...this.defaultFindOptions, ...query };

    if (!['ASC', 'DESC'].includes(query.order)) {
      query.order = 'ASC';
    }

    if (!Object.keys(this.service.model.rawAttributes).includes(query.sort)) {
      query.sort = 'id';
    }

    return query;
  };
}
