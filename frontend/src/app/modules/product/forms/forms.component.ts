import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductEffects } from '../effects/product.effects';
import { EntityCollectionService, EntityCollectionServiceFactory } from '@ngrx/data';
import { EntityMap } from '../../../store/entity/entity-metadata';
import { Product, PRODUCT_CREATED_AT_FIELD, PRODUCT_EMAIL_FIELD } from '../../../interfaces/product/product.interface';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../interfaces/state/app-state.interface';
import { ProductPagination } from '../../../interfaces/product/product-pagination.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { selectProductById } from '../store/product.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectProductPaginationStateData } from '../store/product-pagination/paginations.selectors';
import { authenticationFeatureKey } from '../../../store/auth/auth.state';
import LoggedInUser from '../../../interfaces/auth/loggedin-user.interface';
import { first } from 'rxjs/operators';


@Component({
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class ProductFormsComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  productState: EntityCollectionService<Product>;
  product$: Observable<Product>;
  product: Product;
  subscription: Subscription[] = [];
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  pageData$: Observable<ProductPagination>;
  pageData: ProductPagination;
  id?: number;

  emailField = PRODUCT_EMAIL_FIELD;
  createdAtField = PRODUCT_CREATED_AT_FIELD;
  readonlyFields = [this.emailField, this.createdAtField]
  userId: number;

  constructor(
    private productEffects: ProductEffects,
    private entityCollectionServiceFactory: EntityCollectionServiceFactory,
    private store: Store<AppState>,
    private authStore: Store<{ authenticatedUser: LoggedInUser }>,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.productState = this.entityCollectionServiceFactory.create<Product>(EntityMap.Product);
    this.loading$ = this.productState.loading$;
    this.loaded$ = this.productState.loaded$;
    this.pageData$ = this.store.select(selectProductPaginationStateData);
    this.productForm = this.fb.group({
      productName: [null, [Validators.required]],
      amountAvailable: [null, [Validators.required]],
      cost: [null, [Validators.required]],
    });

    this.authStore.pipe(select(authenticationFeatureKey)).subscribe(user => {
      this.userId = user?.uuid;
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.id = Number(p['id']);
      this.hydratePage();
    });

  }

  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }

  submitForm() {
    const payload: Partial<Product> = {
      id: this.id,
      productName: this.productForm.get('productName').value,
      amountAvailable: this.productForm.get('amountAvailable').value,
      cost: this.productForm.get('cost').value,
    }

    if (this.id) {
      this.productEffects.editProduct(payload)
    } else {
      this.productEffects.addProduct(payload as Product)
    }

  }

  private hydratePage() {
    if (this.id) {
      this.productState.entityMap$?.pipe(
        first()).subscribe(entities => {
        this.product = entities[this.id];
        if (this.product?.sellerId !== this.userId) {
          this.router.navigate(['/product'])
        }
        this.hydrateForms();
      });
      this.productEffects.getProduct(this.id);
      this.subscribeToProduct();
    }
  }

  private hydrateForms() {
    this.productForm.get('productName').setValue(this.product.productName);
    this.productForm.get('amountAvailable').setValue(this.product.amountAvailable);
    this.productForm.get('cost').setValue(this.product.cost);
  }

  private subscribeToProduct() {
    this.product$ = this.store.select(selectProductById(this.id));
  }
}
