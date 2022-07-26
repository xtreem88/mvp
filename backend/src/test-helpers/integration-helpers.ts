import * as express from 'express';
import App from '../App';
export default class IntegrationHelpers {

  public static async getApp(): Promise<express.Application> {
    return App.express;
  }

  public clearDatabase(): void {
    console.info('clear the database');
  }
}
