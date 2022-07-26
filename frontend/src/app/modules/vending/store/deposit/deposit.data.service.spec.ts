import { TestBed } from '@angular/core/testing';
import { EntityDataModule } from '@ngrx/data';
import {MockProvider, MockService} from 'ng-mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { DepositDataService } from './deposit.data.service';
import { VendingService } from '../../../../services/vending/vending.service';
import { entityMetadata } from '../../../../store/entity/entity-metadata';


const depositServiceMock = MockService(VendingService);

describe('DepositDataService', () => {
  let service: DepositDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DepositDataService,
        { provide: VendingService, useValue: depositServiceMock },
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
    service = TestBed.inject(DepositDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should getAll via deposit service', () => {
      spyOn(depositServiceMock, 'getMetaData').and.returnValue(of({allowedAmounts: [5, 10, 20]}));
      service.getAll();
      expect(depositServiceMock.getMetaData).toHaveBeenCalled();
    });
  });
});
