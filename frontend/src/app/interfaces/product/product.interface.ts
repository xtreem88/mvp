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
  count: number;
  current_page: number;
  items_per_page: number;
  total_pages: number;
}

export interface ProductApiResponse {
  data: Product;
  error: boolean;
  message: string;
}

export const PRODUCT_EMAIL_FIELD = 'email';
export const PRODUCT_CREATED_AT_FIELD = 'created_at';
