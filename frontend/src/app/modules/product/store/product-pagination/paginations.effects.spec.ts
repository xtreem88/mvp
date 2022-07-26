import * as assert from 'assert';
import { Store, StoreModule } from '@ngrx/store';
import { Actions, EffectsModule, getEffectsMetadata } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { ProductPaginationEffects } from './paginations.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EntityDataModule } from '@ngrx/data';
import { entityMetadata } from '../../../../store/entity/entity-metadata';
import { AppState } from '../../../../interfaces/state/app-state.interface';
import { metaMock } from '../../../../mocks/pagination/pagination.mock';
import { actionPaginationSetData } from './paginations.actions';


describe('ProductPaginationEffects', () => {
  let store: jasmine.SpyObj<Store<AppState>>;
  let service: ProductPaginationEffects;


  beforeEach(() => {
    store = jasmine.createSpyObj('store', ['pipe', 'dispatch']);
    TestBed.configureTestingModule({
      providers: [
        ProductPaginationEffects,
        {provide: Store, useValue: store}
      ],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        EntityDataModule.forRoot({
          entityMetadata: entityMetadata,
        }),
      ]
    });
    service = TestBed.inject(ProductPaginationEffects);
  });

  describe('setPagingData', () => {
    it('should dispatch actionPaginationSetData action', () => {
      store.dispatch.and.returnValue();
      service.setPagingData(metaMock);
      expect(store.dispatch).toHaveBeenCalled();
    });
    it('should dispatch actionPaginationSetData action with paging data', () => {
      store.dispatch.and.returnValue();
      service.setPagingData(metaMock);
      expect(store.dispatch).toHaveBeenCalledWith(actionPaginationSetData({ pagingData: metaMock }));
    });
  });
});
