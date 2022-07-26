import { of } from 'rxjs';
import { EntityCollectionServiceFactory } from '@ngrx/data';
import { TestBed } from '@angular/core/testing';
import { MockProvider, MockService } from 'ng-mocks';
import { metaMock } from '../../../mocks/pagination/pagination.mock';
import { productMock } from '../../../mocks/product/product.mock';
import { Product } from '../../../interfaces/product/product.interface';
import { DepositEffects } from './deposit.effects';

describe('DepositEffects', () => {
  let service: DepositEffects;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DepositEffects,
        {
          provide: EntityCollectionServiceFactory,
          useValue: {
            create: () => {
              return {
                load: () => of(),
                getByKey: (id: number) => of(),
                update: (c: Product) => of(),
                add: (c: Product) => of(),
                delete: (id: number) => of(),
              }
            }
          },
        },
      ],
    });
    service = TestBed.inject(DepositEffects);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllowedAmounts', () => {
    it('should call deposit data service', () => {
      spyOn(service.depositService, 'load').and.returnValue(of());
      service.getAllowedAmounts();
      expect(service.depositService.load).toHaveBeenCalled();
    });
  });
});
