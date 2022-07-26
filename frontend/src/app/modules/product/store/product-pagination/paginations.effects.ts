import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductPagination } from '../../../../interfaces/product/product-pagination.interface';
import { AppState } from '../../../../interfaces/state/app-state.interface';
import { actionPaginationSetData } from './paginations.actions';


@Injectable()
export class ProductPaginationEffects {
  constructor(
    private store: Store<AppState>
  ) {
  }
  setPagingData(pagingData: ProductPagination) {
    this.store.dispatch(actionPaginationSetData({pagingData}));
  }
}
