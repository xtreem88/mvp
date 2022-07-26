/* eslint-disable @typescript-eslint/explicit-function-return-type */
import 'jest';
import { Sequelize } from 'sequelize';
import Database from '../../database';

describe('Database', () => {
  let instance: Database;

  beforeEach(() => {
    instance = new Database();
  });

  it('should be defined', async () => {
      expect(instance).toBeInstanceOf(Database);
  });

  it('should return an sequelize instance', async () => {
    const exp = instance.sequelize;
    expect(exp).toBeDefined();
    expect(exp).toBeInstanceOf(Sequelize);
    await new Promise((r) => setTimeout(r, 2000));
  });
});
