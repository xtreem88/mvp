import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntityCollectionServiceFactory } from '@ngrx/data';
import { StoreModule } from '@ngrx/store';
import { MockService } from 'ng-mocks';
import { of } from 'rxjs';
import { productMock } from '../../../mocks/product/product.mock';
import { ProductEffects } from '../effects/product.effects';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let effectsMock = MockService(ProductEffects);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      providers: [
        {provide: ProductEffects, useValue: effectsMock},
        {
          provide: EntityCollectionServiceFactory,
          useValue: {
            create: () => {
              return {
                entities$: of([productMock]),
              }
            }
          },
        },
      ],
      imports: [StoreModule.forRoot({}),]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('paginate', () => {
    it('should use effects for pagination', () => {
      spyOn(effectsMock, 'getProducts').and.returnValue(of());
      component.paginate({
        pageIndex: 1,
        pageSize: 20,
        length: 200
      });
      expect(effectsMock.getProducts).toHaveBeenCalled();
    });

    it('should use pass the correct pagination object', () => {
      spyOn(effectsMock, 'getProducts').and.returnValue(of());
      component.paginate({
        pageIndex: 1,
        pageSize: 20,
        length: 200
      });
      expect(effectsMock.getProducts).toHaveBeenCalledWith({
        page: 2,
        per_page: 20,
        total: 200
      });
    });
  })
});
