import { TestBed } from '@angular/core/testing';
import { EntityDataModule } from '@ngrx/data';
import {MockProvider, MockService} from 'ng-mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { DepositDataService } from './deposit.data.service';
import { DepositService } from '../../../services/deposit/deposit.service';
import { entityMetadata } from '../../../store/entity/entity-metadata';
import { depositMock } from '../../../mocks/deposit/deposit.mock';
import { metaMock } from '../../../mocks/pagination/pagination.mock';
import { DepositPaginationEffects } from './deposit-pagination/paginations.effects';


const depositServiceMock = MockService(DepositService);
const mockPagingEffect = MockService(DepositPaginationEffects);

describe('DepositDataService', () => {
  let service: DepositDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DepositDataService,
        { provide: DepositService, useValue: depositServiceMock },
        { provide: DepositPaginationEffects, useValue: mockPagingEffect}
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
      spyOn(depositServiceMock, 'getDeposits').and.returnValue(of({
        deposits: [depositMock],
        meta: metaMock
      }));
      service.getAll();
      expect(depositServiceMock.getDeposits).toHaveBeenCalled();
    });

    it('should getAll via deposit service with no argument', () => {
      spyOn(depositServiceMock, 'getDeposits').and.returnValue(of({
        deposits: [depositMock],
        meta: metaMock
      }));
      service.getAll();
      expect(depositServiceMock.getDeposits).toHaveBeenCalledWith({});
    });

    it('should call paging effects after it gets a successful response', () => {
      spyOn(depositServiceMock, 'getDeposits').and.returnValue(of({
        deposits: [depositMock],
        meta: metaMock
      }));
      spyOn(mockPagingEffect, 'setPagingData').and.returnValue();
      service.getAll().subscribe()
      expect(mockPagingEffect.setPagingData).toHaveBeenCalled();
    });

    it('should call paging effects with response metadata', () => {
      spyOn(depositServiceMock, 'getDeposits').and.returnValue(of({
        deposits: [depositMock],
        meta: metaMock
      }));
      spyOn(mockPagingEffect, 'setPagingData').and.returnValue();
      service.getAll().subscribe()
      expect(mockPagingEffect.setPagingData).toHaveBeenCalledWith(metaMock);
    });
  });


  describe('getById', () => {
    it('should getById via deposit service', () => {
      spyOn(depositServiceMock, 'getDeposit').and.returnValue(of({deposit: depositMock}));
      service.getById(5);
      expect(depositServiceMock.getDeposit).toHaveBeenCalled();
    });

    it('should getById via deposit service with correct argument', () => {
      spyOn(depositServiceMock, 'getDeposit').and.returnValue(of({deposit: depositMock}));
      service.getById(5);
      expect(depositServiceMock.getDeposit).toHaveBeenCalledWith(5);
    });
  });

  describe('update', () => {
    it('should update via deposit service', () => {
      spyOn(depositServiceMock, 'updateDeposit').and.returnValue(of({deposit: depositMock}));
      service.update({
        id: depositMock.id,
        changes: depositMock
      });
      expect(depositServiceMock.updateDeposit).toHaveBeenCalled();
    });

    it('should update via deposit service with correct argument', () => {
      spyOn(depositServiceMock, 'updateDeposit').and.returnValue(of({deposit: depositMock}));
      service.update({
        id: depositMock.id,
        changes: depositMock
      });
      expect(depositServiceMock.updateDeposit).toHaveBeenCalledWith(depositMock.id, {deposit: depositMock});
    });
  })

  describe('add', () => {
    it('should add via deposit service', () => {
      spyOn(depositServiceMock, 'createDeposit').and.returnValue(of({deposit: depositMock}));
      service.add(depositMock);
      expect(depositServiceMock.createDeposit).toHaveBeenCalled();
    });

    it('should add via deposit service with correct argument', () => {
      spyOn(depositServiceMock, 'createDeposit').and.returnValue(of({deposit: depositMock}));
      service.add(depositMock);
      expect(depositServiceMock.createDeposit).toHaveBeenCalledWith(depositMock);
    });
  })
});
