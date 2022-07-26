import { TestBed, inject } from '@angular/core/testing';
import { MockProvider, MockService } from 'ng-mocks';
import { of } from 'rxjs';
import { metaMock } from '../../mocks/pagination/pagination.mock';
import { ApiService } from '../../repository/api/api.repository';
import { VendingService } from './vending.service';

let service: VendingService;
let mockAPiService = MockService(ApiService);
describe('VendingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VendingService,
        { provide: ApiService, useValue: mockAPiService}
      ],
    });

    service = TestBed.inject(VendingService);
  });

  it('should create the class', () => {
    expect(VendingService).toBeTruthy();
  });

  describe('getMetaData', () => {
    it('should call callHttpGet when called without paging data', () => {
      spyOn(mockAPiService, 'callHttpGet').and.returnValue(of());
      service.getMetaData();
      expect(mockAPiService.callHttpGet).toHaveBeenCalled();
    });
  });

  describe('deposit', () => {
    it('should call callHttpPost', () => {
      spyOn(mockAPiService, 'callHttpPost').and.returnValue(of());
      service.deposit([5, 20, 50]);
      expect(mockAPiService.callHttpPost).toHaveBeenCalled();
    });
  });

});
