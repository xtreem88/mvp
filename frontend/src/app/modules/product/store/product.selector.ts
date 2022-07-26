import { EntitySelectorsFactory } from "@ngrx/data";
import { createSelector } from "@ngrx/store";
import { Product } from '../../../interfaces/product/product.interface';
import { EntityMap } from '../../../store/entity/entity-metadata';

export const productSelectors = new EntitySelectorsFactory().create<Product>(EntityMap.Product);

export const selectProductById = (id: number) => createSelector(
  productSelectors.selectEntityMap,
  (data) => {
    const product: Product = Object.assign({}, data[id]);

    return product;
  }
);
