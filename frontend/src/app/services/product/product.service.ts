import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product, ProductApiResponse, ProductsApiResponse } from '../../interfaces/product/product.interface';
import { ApiService } from '../../repository/api/api.repository';
import { ProductPagination } from '../../interfaces/product/product-pagination.interface';


@Injectable()
export class ProductService {
  private apiPath = '/products';
  constructor(private apiClient: ApiService) {
  }

  getProducts(paging?: ProductPagination): Observable<ProductsApiResponse> {
    let param: any
    if (paging) {
      param = {
        limit: paging.per_page,
        page: paging.page
      }
    }
    return this.apiClient.callHttpGet({
      path: `${this.apiPath}`,
      version: environment.apiVersion,
      param: param,
      type: ''
    });
  }

  getProduct(id: number): Observable<ProductApiResponse> {
    return this.apiClient.callHttpGet({
      path: `${this.apiPath}/${id}`,
      version: environment.apiVersion,
      type: ''
    });
  }

  createProduct(product: Product): Observable<ProductApiResponse> {
    return this.apiClient.callHttpPost({
      path: `${this.apiPath}`,
      param: product,
      version: environment.apiVersion,
      type: ''
    });
  }

  updateProduct(id: number, product: Partial<Product>): Observable<ProductApiResponse> {
    return this.apiClient.callHttpPut({
      path: `${this.apiPath}/${id}`,
      param: product,
      version: environment.apiVersion,
      type: ''
    });
  }

  deleteProduct(id: number) {
    return this.apiClient.callHttpDelete({
      path: `${this.apiPath}/${id}`,
      version: environment.apiVersion,
      type: ''
    });
  }
}
