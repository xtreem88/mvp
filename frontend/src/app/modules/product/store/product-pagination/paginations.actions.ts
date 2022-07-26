import { createAction, props } from '@ngrx/store';
import { ProductPagination } from '../../../../interfaces/product/product-pagination.interface';

export const actionPaginationSetData = createAction(
  '[ProductPagination] Set Pagination Data',
  props<{ pagingData: ProductPagination }>()
);
