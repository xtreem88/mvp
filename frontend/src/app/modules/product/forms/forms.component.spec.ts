import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EntityCollectionServiceFactory } from '@ngrx/data';
import { StoreModule } from '@ngrx/store';
import { MockService } from 'ng-mocks';
import { of } from 'rxjs';
import { productMock } from '../../../mocks/product/product.mock';
import { ProductEffects } from '../effects/product.effects';
import { ProductFormsComponent } from './forms.component';


describe('ProductFormsComponent', () => {
  let component: ProductFormsComponent;
  let fixture: ComponentFixture<ProductFormsComponent>;
  const activatedRouteStub = {
    params: of({id: '1234', groupid: '12345'})
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFormsComponent ],
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
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule,
        StoreModule.forRoot({}),]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
