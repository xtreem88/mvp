import { Injectable } from '@angular/core';
import { EntityCollectionService, EntityCollectionServiceFactory } from '@ngrx/data';
import { ProductPagination } from '../../../interfaces/product/product-pagination.interface';
import { Product } from '../../../interfaces/product/product.interface';
import { EntityMap } from '../../../store/entity/entity-metadata';
import { ProductPaginationEffects } from '../store/product-pagination/paginations.effects';



@Injectable()
export class ProductEffects {
  productService: EntityCollectionService<Product>;
  constructor(
    private entityCollectionServiceFactory: EntityCollectionServiceFactory,
    private paginationEffect: ProductPaginationEffects
  ) {
    this.productService = this.entityCollectionServiceFactory.create<Product>(EntityMap.Product);
  }

  getProducts(paging?: ProductPagination) {
    if (paging) {
      this.paginationEffect.setPagingData(paging);
    }

    this.productService.load();
  }

  getProduct(id: number) {
    this.productService.getByKey(id);
  }

  editProduct(payload: Partial<Product>) {
    this.productService.update(payload);
  }

  addProduct(payload: Product) {
    this.productService.add(payload);
  }

  deleteProduct(id: number) {
    this.productService.delete(id);
  }
}
