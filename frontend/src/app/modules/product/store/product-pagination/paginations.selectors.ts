import { createSelector } from '@ngrx/store';
import { AppState } from '../../../../interfaces/state/app-state.interface';
import { ProductPaginationState } from './paginations.model';


export const selectedProductPaginationState = (state: AppState) => state.productPagination;

export const selectProductPaginationStateData = createSelector(
  selectedProductPaginationState,
  (state: ProductPaginationState) => state?.data
);
