import { TimestampsModel } from './../../common/classes/timestamps-model';
import { timestamps } from './../../common/constants/timestamps';
import { defaultScope, scopes } from './product.scopes';
import { DataTypes } from 'sequelize';

export default class Product extends TimestampsModel {
  public id!: number;
  public productName!: string;
  public amountAvailable!: number;
  public cost!: number;
  public sellerId!: number;
}

export const attributes = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amountAvailable: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cost: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sellerId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
   }
  }
};

export const init = (sequelize): void => {
  Product.init(attributes, {
    sequelize,
    tableName: 'products',
    defaultScope,
    scopes,
    ...timestamps,
  });
};

export const associate = (model, sequelize): void => {
  model.belongsTo(sequelize.models.User);
};
