import { metaMock } from '../../../../mocks/pagination/pagination.mock';
import { actionPaginationSetData } from './paginations.actions';

describe('pagination Actions', () => {
  it('should create actionPaginationSetData action', () => {
    const action = actionPaginationSetData({pagingData: metaMock});
    expect(action.type).toEqual(actionPaginationSetData.type);
    expect(action.pagingData).toEqual(
      jasmine.objectContaining({
        ...metaMock
      })
    );
  });

});
