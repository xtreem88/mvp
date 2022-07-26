import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { EntityCollectionServiceFactory } from '@ngrx/data';
import { StoreModule } from '@ngrx/store';
import { MockService } from 'ng-mocks';
import { of } from 'rxjs';
import { productMock } from '../../../mocks/product/product.mock';
import { ProductEffects } from '../effects/product.effects';
import { ProductViewComponent } from './product.component';


describe('ProductViewComponent', () => {
  let component: ProductViewComponent;
  let fixture: ComponentFixture<ProductViewComponent>;
  const activatedRouteStub = {
    params: of({id: '1234', groupid: '12345'})
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductViewComponent ],
      providers: [
        {provide: ProductEffects, useValue: MockService(ProductEffects)},
        { provide: ActivatedRoute, useValue: activatedRouteStub },
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
    fixture = TestBed.createComponent(ProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
