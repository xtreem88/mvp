import { TestBed, inject } from '@angular/core/testing';
import { MockProvider, MockService } from 'ng-mocks';
import { of } from 'rxjs';
import { metaMock } from '../../mocks/pagination/pagination.mock';
import { ApiService } from '../../repository/api/api.repository';
import { ProductService } from './product.service';

let service: ProductService;
let mockAPiService = MockService(ApiService);
describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        { provide: ApiService, useValue: mockAPiService}
      ],
    });

    service = TestBed.inject(ProductService);
  });

  it('should create the class', () => {
    expect(ProductService).toBeTruthy();
  });

  describe('getProducts', () => {
    it('should call callHttpGet when called without paging data', () => {
      spyOn(mockAPiService, 'callHttpGet').and.returnValue(of());
      service.getProducts();
      expect(mockAPiService.callHttpGet).toHaveBeenCalled();
    });

    it('should call callHttpGet with correct arguments when called without paging data', () => {
      spyOn(mockAPiService, 'callHttpGet').and.returnValue(of());
      service.getProducts();
      expect(mockAPiService.callHttpGet).toHaveBeenCalledWith({
        path: '/products', version: '', param: undefined, type: '' });
    });

    it('should call callHttpGet when called with paging datat', () => {
      spyOn(mockAPiService, 'callHttpGet').and.returnValue(of());
      service.getProducts(metaMock);
      expect(mockAPiService.callHttpGet).toHaveBeenCalled();
    });

    it('should call callHttpGet with correct arguments when called with paging data', () => {
      spyOn(mockAPiService, 'callHttpGet').and.returnValue(of());
      service.getProducts(metaMock);
      expect(mockAPiService.callHttpGet).toHaveBeenCalledWith({
        path: '/products', version: '', param: metaMock, type: '' });
    });
  });

  describe('getProduct', () => {
    it('should call callHttpGet', () => {
      spyOn(mockAPiService, 'callHttpGet').and.returnValue(of());
      service.getProduct(5);
      expect(mockAPiService.callHttpGet).toHaveBeenCalled();
    });

    it('should with callHttpGet with corract argument', () => {
      spyOn(mockAPiService, 'callHttpGet').and.returnValue(of());
      service.getProduct(5);
      expect(mockAPiService.callHttpGet).toHaveBeenCalledWith({
        path: '/products/5', version: '', type: '' });
    });
  });

});
