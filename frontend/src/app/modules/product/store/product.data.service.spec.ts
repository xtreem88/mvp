import { TestBed } from '@angular/core/testing';
import { EntityDataModule } from '@ngrx/data';
import {MockProvider, MockService} from 'ng-mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ProductDataService } from './product.data.service';
import { ProductService } from '../../../services/product/product.service';
import { entityMetadata } from '../../../store/entity/entity-metadata';
import { productMock } from '../../../mocks/product/product.mock';
import { metaMock } from '../../../mocks/pagination/pagination.mock';
import { ProductPaginationEffects } from './product-pagination/paginations.effects';


const productServiceMock = MockService(ProductService);
const mockPagingEffect = MockService(ProductPaginationEffects);

describe('ProductDataService', () => {
  let service: ProductDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductDataService,
        { provide: ProductService, useValue: productServiceMock },
        { provide: ProductPaginationEffects, useValue: mockPagingEffect}
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
    service = TestBed.inject(ProductDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should getAll via product service', () => {
      spyOn(productServiceMock, 'getProducts').and.returnValue(of({
        rows: [productMock],
        count: 10000,
        current_page: 1,
        items_per_page: 25,
        total_pages: 10000
      }));
      service.getAll();
      expect(productServiceMock.getProducts).toHaveBeenCalled();
    });

    it('should getAll via product service with no argument', () => {
      spyOn(productServiceMock, 'getProducts').and.returnValue(of({
        rows: [productMock],
        count: 10000,
        current_page: 1,
        items_per_page: 25,
        total_pages: 10000
      }));
      service.getAll();
      expect(productServiceMock.getProducts).toHaveBeenCalledWith(<any>{});
    });

    it('should call paging effects after it gets a successful response', () => {
      spyOn(productServiceMock, 'getProducts').and.returnValue(of({
        rows: [productMock],
        count: 10000,
        current_page: 1,
        items_per_page: 25,
        total_pages: 10000
      }));
      spyOn(mockPagingEffect, 'setPagingData').and.returnValue();
      service.getAll().subscribe()
      expect(mockPagingEffect.setPagingData).toHaveBeenCalled();
    });

    it('should call paging effects with response metadata', () => {
      spyOn(productServiceMock, 'getProducts').and.returnValue(of({
        rows: [productMock],
        count: 10000,
        current_page: 1,
        items_per_page: 25,
        total_pages: 10000
      }));
      spyOn(mockPagingEffect, 'setPagingData').and.returnValue();
      service.getAll().subscribe()
      expect(mockPagingEffect.setPagingData).toHaveBeenCalledWith(metaMock);
    });
  });


  describe('getById', () => {
    it('should getById via product service', () => {
      spyOn(productServiceMock, 'getProduct').and.returnValue(of({data: productMock, error: false, message: ''}));
      service.getById(5);
      expect(productServiceMock.getProduct).toHaveBeenCalled();
    });

    it('should getById via product service with correct argument', () => {
      spyOn(productServiceMock, 'getProduct').and.returnValue(of({data: productMock, error: false, message: ''}));
      service.getById(5);
      expect(productServiceMock.getProduct).toHaveBeenCalledWith(5);
    });
  });

  describe('update', () => {
    it('should update via product service', () => {
      spyOn(productServiceMock, 'updateProduct').and.returnValue(of({data: productMock, error: false, message: ''}));
      service.update({
        id: productMock.id,
        changes: productMock
      });
      expect(productServiceMock.updateProduct).toHaveBeenCalled();
    });

    it('should update via product service with correct argument', () => {
      spyOn(productServiceMock, 'updateProduct').and.returnValue(of({data: productMock, error: false, message: ''}));
      service.update({
        id: productMock.id,
        changes: productMock
      });
      expect(productServiceMock.updateProduct).toHaveBeenCalledWith(productMock.id, productMock);
    });
  })

  describe('add', () => {
    it('should add via product service', () => {
      spyOn(productServiceMock, 'createProduct').and.returnValue(of({data: productMock, error: false, message: ''}));
      service.add(productMock);
      expect(productServiceMock.createProduct).toHaveBeenCalled();
    });

    it('should add via product service with correct argument', () => {
      spyOn(productServiceMock, 'createProduct').and.returnValue(of({data: productMock, error: false, message: ''}));
      service.add(productMock);
      expect(productServiceMock.createProduct).toHaveBeenCalledWith(productMock);
    });
  })
});
