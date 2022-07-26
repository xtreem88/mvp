import { of } from 'rxjs';
import { EntityCollectionServiceFactory } from '@ngrx/data';
import { ProductEffects } from './product.effects';
import { TestBed } from '@angular/core/testing';
import { ProductPaginationEffects } from '../store/product-pagination/paginations.effects';
import { MockProvider, MockService } from 'ng-mocks';
import { metaMock } from '../../../mocks/pagination/pagination.mock';
import { productMock } from '../../../mocks/product/product.mock';
import { Product } from '../../../interfaces/product/product.interface';

const mockPagingEffect = MockService(ProductPaginationEffects);
describe('ProductEffects', () => {
  let service: ProductEffects;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        MockProvider(ProductPaginationEffects),
        { provide: ProductPaginationEffects, useValue: mockPagingEffect},
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
    service = TestBed.inject(ProductEffects);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    it('should call product data service', () => {
      spyOn(service.productService, 'load').and.returnValue(of());
      service.getProducts();
      expect(service.productService.load).toHaveBeenCalled();
    });

    it('should call product data service with no argument', () => {
      spyOn(service.productService, 'load').and.returnValue(of());
      service.getProducts();
      expect(service.productService.load).toHaveBeenCalledWith();
    });

    it('should not call pagination effect when paging is not set', () => {
      spyOn(mockPagingEffect, 'setPagingData').and.returnValue();
      service.getProducts();
      expect(mockPagingEffect.setPagingData).toHaveBeenCalledTimes(0);
    });

    it('should call pagination effect when paging is set', () => {
      spyOn(mockPagingEffect, 'setPagingData').and.returnValue();
      service.getProducts(metaMock);
      expect(mockPagingEffect.setPagingData).toHaveBeenCalled();
    });

    it('should call pagination effect with correct argument', () => {
      spyOn(mockPagingEffect, 'setPagingData').and.returnValue();
      service.getProducts(metaMock);
      expect(mockPagingEffect.setPagingData).toHaveBeenCalledWith(metaMock);
    });
  });

  describe('getProduct', () => {
    it('should call product data service', () => {
      spyOn(service.productService, 'getByKey').and.returnValue(of());
      service.getProduct(5);
      expect(service.productService.getByKey).toHaveBeenCalled();
    });

    it('should call product data service with correct argument', () => {
      spyOn(service.productService, 'getByKey').and.returnValue(of());
      service.getProduct(5);
      expect(service.productService.getByKey).toHaveBeenCalledWith(5);
    });
  });

  describe('editProduct', () => {
    it('should call product data service', () => {
      spyOn(service.productService, 'update').and.returnValue(of());
      service.editProduct(productMock);
      expect(service.productService.update).toHaveBeenCalled();
    });

    it('should call product data service with correct argument', () => {
      spyOn(service.productService, 'update').and.returnValue(of());
      service.editProduct(productMock);
      expect(service.productService.update).toHaveBeenCalledWith(productMock);
    });
  });

  describe('addProduct', () => {
    it('should call product data service', () => {
      spyOn(service.productService, 'add').and.returnValue(of());
      service.addProduct(productMock);
      expect(service.productService.add).toHaveBeenCalled();
    });

    it('should call product data service with correct argument', () => {
      spyOn(service.productService, 'add').and.returnValue(of());
      service.addProduct(productMock);
      expect(service.productService.add).toHaveBeenCalledWith(productMock);
    });
  });

  describe('deleteProduct', () => {
    it('should call product data service', () => {
      spyOn(service.productService, 'delete').and.returnValue(of());
      service.deleteProduct(5);
      expect(service.productService.delete).toHaveBeenCalled();
    });

    it('should call product data service with correct argument', () => {
      spyOn(service.productService, 'delete').and.returnValue(of());
      service.deleteProduct(5);
      expect(service.productService.delete).toHaveBeenCalledWith(5);
    });
  });
});
