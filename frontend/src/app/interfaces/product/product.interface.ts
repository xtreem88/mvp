import { ProductPagination } from './product-pagination.interface';

export interface Product {
  dateLoaded?: Date;
  sellerId:	number;
  productName:	string;
  amountAvailable: number;
  cost: number;
  id:	number;
}

export interface ProductsApiResponse {
  rows: Product[];
  meta: ProductPagination;
}

export interface ProductApiResponse {
  product: Product;
}

export interface ProductApiPayload {
  product: Partial<Product>;
}

export const PRODUCT_EMAIL_FIELD = 'email';
export const PRODUCT_CREATED_AT_FIELD = 'created_at';
