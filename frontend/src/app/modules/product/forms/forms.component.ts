import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductEffects } from '../effects/product.effects';
import { EntityCollectionService, EntityCollectionServiceFactory } from '@ngrx/data';
import { EntityMap } from '../../../store/entity/entity-metadata';
import { Product, ProductApiPayload, PRODUCT_CREATED_AT_FIELD, PRODUCT_EMAIL_FIELD } from '../../../interfaces/product/product.interface';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../interfaces/state/app-state.interface';
import { ProductPagination } from '../../../interfaces/product/product-pagination.interface';
import { ActivatedRoute } from '@angular/router';
import { selectProductById } from '../store/product.selector';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { selectProductPaginationStateData } from '../store/product-pagination/paginations.selectors';


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

  constructor(
    private productEffects: ProductEffects,
    private entityCollectionServiceFactory: EntityCollectionServiceFactory,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.productState = this.entityCollectionServiceFactory.create<Product>(EntityMap.Product);
    this.loading$ = this.productState.loading$;
    this.loaded$ = this.productState.loaded$;
    this.pageData$ = this.store.select(selectProductPaginationStateData);
    this.productForm = this.fb.group({
      attributes: this.fb.array([]),
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

  getAttributes(): FormArray {
    return this.productForm.get('attributes') as FormArray;
  }

  private isValidAttributeKey(key: string) {
    return !this.readonlyFields.includes(key.toLowerCase());
  }

  addAttribute(key: string, value: string, editable = true) {
    this.getAttributes().push(this.fb.group({
      key: key,
      value: value,
      canEdit: editable
    }));
  }

  removeAllAttributes() {
    while(this.getAttributes().length > 0) {
      this.removeAttribute(0);
    }
  }

  removeAttribute(i: number) {
    this.getAttributes().removeAt(i);
  }

  submitForm() {
    const payload: Partial<Product> = {
      id: this.id,
    }


    this.productEffects.editProduct(payload)
  }

  private hydratePage() {
    if (this.id) {
      this.productEffects.getProduct(this.id);
      this.subscribeToProduct();
    }
  }

  private subscribeToProduct() {
    this.product$ = this.store.select(selectProductById(this.id));
  }
}
