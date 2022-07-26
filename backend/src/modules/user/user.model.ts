import { hashSync } from 'bcryptjs';
import { TimestampsModel } from './../../common/classes/timestamps-model';
import { timestamps } from './../../common/constants/timestamps';
import { defaultScope, scopes } from './user.scopes';
import { DataTypes } from 'sequelize';


export enum ValidRoles {
  buyer = 'buyer',
  seller = 'seller',
  admin = 'admin'
}
export default class User extends TimestampsModel {
  public id!: number;
  public name!: string;
  public username!: string;
  public password!: string;
  public deposit!: number;
  public role!: keyof typeof ValidRoles;
  public reset_password_token!: string;
  public reset_password_expires!: Date;
}

const hooks = {
  beforeCreate: (user): void => {
    user.password = hashSync(user.password, 10);
  }
};

export const attributes = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deposit: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('buyer', 'seller', 'admin'),
    allowNull: false,
    default: 'buyer'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reset_password_token: {
    type: DataTypes.STRING,
    allowNull: true
  },
  reset_password_expires: {
    type: DataTypes.DATE,
    allowNull: true
  }
};

export const init = (sequelize): void => {
  User.init(attributes, {
    sequelize,
    tableName: 'users',
    defaultScope,
    scopes,
    ...timestamps,
    hooks
  });
};
