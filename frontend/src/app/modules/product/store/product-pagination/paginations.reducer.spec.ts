import { HttpErrorResponse } from '@angular/common/http';
import { ProductPagination } from '../../../../interfaces/product/product-pagination.interface';
import { metaMock } from '../../../../mocks/pagination/pagination.mock';
import { actionPaginationSetData } from './paginations.actions';
import { ProductPaginationState } from './paginations.model';
import { initialState, productPaginationReducer } from './paginations.reducer';

const originalState: ProductPaginationState = {};

describe('PaginationsReducer', () => {
  describe('undefined action', () => {
    describe('with undefined original state', () => {
      it('should return the initial state', () => {
        const action = {} as any;
        const state =productPaginationReducer(undefined, action);

        expect(state).toBe(initialState);
      });
    });

    describe('with a valid original state', () => {
      it('should return the original state', () => {
        const action = {} as any;
        const state = productPaginationReducer(originalState, action);

        expect(state).toBe(originalState);
      });
    });
  });

  describe('Set Group Context action', () => {
    it('should set set group context', () => {
      const action = actionPaginationSetData({pagingData: metaMock});
      const state = productPaginationReducer(originalState, action);

      expect(state.data).toEqual(metaMock);
      expect(state.status).toBe(actionPaginationSetData.type);
    });
  });
});
