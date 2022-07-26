import { ExceptionHandler } from '../handlers/exception';
import { HTTP } from '../constants/http';
import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import User from '../../modules/user/user.model';
import { errorMessages } from '../utils/messages';

const { APP_SECRET_KEY } = process.env;

export interface UserState {
  user: User;
  expires: number;
}

export default abstract class HttpController extends ExceptionHandler {
  public secretKey: string = APP_SECRET_KEY || '';


  /**
   *
   * @param req
  */
  public getTokenFromRequest(req: Request): string | null {
    let authorization = req.header('Authorization');
    return authorization || null;
  }

  /**
   *
   * @param req
   */
  public getAuthUser = async (req: Request): Promise<User | null> => {
    const token = this.getToken(req);
    return await this.getAuthUserByToken(token);
  };

  /**
   *
   * @param req
   */
   public getAuthUserState = async (req: Request): Promise<UserState | null> => {
    const token = this.getToken(req);
    return await this.getAuthUserStateByToken(token);
  };

  /**
   *
   * @param token
   */
  public getAuthUserByToken = async (token: string): Promise<User | null> => {
    const decoded: any = verify(token, this.secretKey);

    if (decoded.exp <= Date.now())
      throw new Error(errorMessages.accessExpired);

    return await User.findOne({ where: { username: decoded.username } });
  };

  /**
   *
   * @param token
   */
   public getAuthUserStateByToken = async (token: string): Promise<UserState | null> => {
    const decoded: any = verify(token, this.secretKey);

    if (decoded.exp <= Date.now())
      throw new Error(errorMessages.accessExpired);

      const user = await User.findOne({ where: { username: decoded.username } })
    return {user, expires: decoded.exp};
  };

  /**
   *
   * @param token
   */
   public logout = async (token: string): Promise<null> => {
    const decoded: any = verify(token, this.secretKey);

    if (decoded.exp > Date.now()) {
      sign({ username: decoded.username, exp: 1 }, this.secretKey);
    }

    return null;
  };

  /**
   *
   * @param req
   */
  public getToken = (req: Request): string => {
    const token = this.getTokenFromRequest(req);
    if (!token) throw new Error('Token is required');

    return token;
  };

  /**
   * @param res
   * @param data
   * @param message
   * @param error
   * @param status
   */
  public return = (
    res: Response,
    data: any = {},
    message: any = null,
    error: boolean = false,
    status: number = HTTP.OK
  ): Response => {
    return res.status(status).send({ message, data, error });
  };
  /**
   *
   * @param res
   * @param data
   * @param status
   */
  public returnData = (
    res: Response,
    data: any = {},
    status: number = HTTP.OK
  ): Response => {
    return res.status(status).send(data);
  };

  /**
   *
   * @param res
   * @param message
   * @param status
   * @param error
   */
  public returnMessage = (
    res: Response,
    message: string = '',
    status: number = HTTP.OK,
    error: boolean = false
  ): Response => {
    return res.status(status).send({ message, error });
  };

  /**
   *
   * @param res
   * @param data
   * @param message
   */
  public returnCreated = (
    res: Response,
    data: any = {},
    message: string = 'Created'
  ): Response => {
    return this.return(res, data, message, false, HTTP.CREATED);
  };

  /**
   *
   * @param res
   * @param data
   * @param message
   */
  public returnNoContent = (
    res: Response,
  ): Response => {
    return this.return(res, null, '', false, HTTP.NO_CONTENT);
  };

  /**
   *
   * @param res
   * @param message
   */
  public returnBadRequest = (
    res: Response,
    message: string = 'Bad Request',
    data: any = {}
  ): Response => {
    return this.return(res, data, message, true, HTTP.BAD_REQUEST);
  };

  /**
   *
   * @param res
   * @param message
   */
  public returnUnauthorized = (
    res: Response,
    message: string = 'Unauthorized'
  ): Response => {
    return this.returnMessage(res, message, HTTP.UNAUTHORIZED, true);
  };

  /**
   *
   * @param res
   * @param message
   */
  public returnNotFound = (
    res: Response,
    message: string = 'Not Found'
  ): Response => {
    return this.returnMessage(res, message, HTTP.NOT_FOUND, true);
  };

  /**
   *
   * @param res
   * @param message
   */
  public returnServerError = (
    res: Response,
    message: string = 'Internal Server Error'
  ): Response => {
    return this.returnMessage(res, message, HTTP.INTERNAL_SERVER_ERROR, true);
  };

  /**
   *
   * @param res
   * @param content
   * @param type
   * @param length
   */
  public returnFile = (
    res: Response,
    content: Buffer | string | any,
    type: string,
    length: string | number
  ): void => {
    const headers = {
      'Content-Type': type,
      'Content-Length': length
    };
    res.writeHead(HTTP.OK, headers);
    return res.end(content);
  };

  /**
   *
   * @param res
   * @param error
   */
  public processException = (res: Response, error: any): Response => {
    const { errorData, statusCode } = this.handleErrors(error);
    return this.returnData(res, errorData, statusCode);
  };
}
