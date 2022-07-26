import { Product } from '../product/product.interface';

export interface VendingState {
  buy?: {
    productId?: number,
    product?: Product,
    count?: number,
    change?: number[],
    success?: boolean,
    loading?: boolean,
    error?: any,
  },
  deposit?: {
    coins?: number[],
    success?: boolean,
    loading?: boolean,
    error?: any,
  }
}
