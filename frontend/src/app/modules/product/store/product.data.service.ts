import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  DefaultDataService,
  HttpUrlGenerator} from '@ngrx/data';

import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product } from '../../../interfaces/product/product.interface';
import { EntityMap } from '../../../store/entity/entity-metadata';
import { Update } from '@ngrx/entity';
import { ProductPaginationEffects } from './product-pagination/paginations.effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../../interfaces/state/app-state.interface';
import { selectProductPaginationStateData } from './product-pagination/paginations.selectors';
import { ProductPagination } from '../../../interfaces/product/product-pagination.interface';
import { ProductService } from '../../../services/product/product.service';

@Injectable()
export class ProductDataService extends DefaultDataService<Product> implements OnDestroy {
  subscription: Subscription[] = [];
  pageData$: Observable<ProductPagination>;
  pageData?: ProductPagination;
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private productService: ProductService,
    private paginationEffects: ProductPaginationEffects,
    private store: Store<AppState>,
  ) {
    super(EntityMap.Product, http, httpUrlGenerator);
    this.pageData$ = this.store.select(selectProductPaginationStateData);
    this.subscription.push(this.pageData$.subscribe((data) => {
      this.pageData = data;
    }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe())
  }

  getAll(): Observable<Product[]> {
    const paging = Object.assign({}, this.pageData);
    if (paging) {
      delete paging.total
    }
    return this.productService.getProducts(paging)
      .pipe(
        tap((response) => this.paginationEffects.setPagingData({
          total: response.count,
          page: response.current_page,
          per_page: response.items_per_page
        })),
        map((response) => response.rows));
  }

  getById(id: number): Observable<Product> {
    return this.productService.getProduct(id)
    .pipe(
      map(cust => cust.data)
    );
  }

  update(product: Update<Product>): Observable<Product> {
    return this.productService.updateProduct(
      product.changes.id,
      product.changes).pipe(
        map(cust => cust.data)
      );
  }

  add(product: Product): Observable<Product> {
    return this.productService.createProduct(product).pipe(
      map(cust => cust.data)
    );
  }

  delete(key: number): Observable<string | number> {
    return this.productService.deleteProduct(key);
  }
}
