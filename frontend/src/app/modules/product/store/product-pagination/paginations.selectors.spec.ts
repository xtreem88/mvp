import { AppState } from '../../../../interfaces/state/app-state.interface';
import { metaMock } from '../../../../mocks/pagination/pagination.mock';
import { actionPaginationSetData } from './paginations.actions';
import { ProductPaginationState } from './paginations.model';
import { selectProductPaginationStateData, selectedProductPaginationState } from './paginations.selectors';


describe('IntegrationState Selectors', () => {
  it('should return integration state', () => {
    const state = {
      productPagination: <ProductPaginationState>{},
    } as AppState;
	  expect((selectedProductPaginationState(state))).toEqual({});
	});

  it('should return loading', () => {
	  const state: ProductPaginationState = {
      data: metaMock,
      status: actionPaginationSetData.type
	  };

	  expect(selectProductPaginationStateData.projector(state)).toEqual(metaMock);
	});
});
