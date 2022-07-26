import { Action, createReducer, on } from '@ngrx/store';
import { actionPaginationSetData } from './paginations.actions';
import { ProductPaginationState } from './paginations.model';


export const initialState: ProductPaginationState = {
};

const reducer = createReducer(
  initialState,
  on(actionPaginationSetData, (state, { type, pagingData }) => ({
    ...state,
    data: pagingData,
    status: type,
  })),
);

export function productPaginationReducer(
  state: ProductPaginationState | undefined,
  action: Action
) {
  return reducer(state, action);
}
