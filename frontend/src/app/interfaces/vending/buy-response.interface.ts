import { Product } from '../product/product.interface';

export interface BuyResponse {
  total: number;
  product: Product;
  change: number[];
}
