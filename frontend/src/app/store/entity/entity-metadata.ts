import { EntityMetadataMap } from '@ngrx/data';
import { Product } from '../../interfaces/product/product.interface';

export const entityMetadata: EntityMetadataMap = {
  Product: {
    selectId: (product: Product) => product.id
  },
  DepositMeta: {
    selectId: (amount: number) => amount
  }
};


export enum EntityMap {
  Product = 'Product',
  Deposit = 'DepositMeta'
}
