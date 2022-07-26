import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductEffects } from '../effects/product.effects';
import { EntityCollectionService, EntityCollectionServiceFactory } from '@ngrx/data';
import { EntityMap } from '../../../store/entity/entity-metadata';
import { Product } from '../../../interfaces/product/product.interface';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../interfaces/state/app-state.interface';
import { selectProductPaginationStateData } from '../store/product-pagination/paginations.selectors';
import { ProductPagination } from '../../../interfaces/product/product-pagination.interface';
import { ActivatedRoute } from '@angular/router';
import { selectProductById } from '../store/product.selector';
import { vendingbuyEvent } from '../../../store/vending/vending.actions';
import LoggedInUser from '../../../interfaces/auth/loggedin-user.interface';
import { authenticationFeatureKey } from '../../../store/auth/auth.state';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductViewComponent implements OnInit, OnDestroy {
  productState: EntityCollectionService<Product>;
  product$: Observable<Product>;
  subscription: Subscription[] = [];
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  pageData$: Observable<ProductPagination>;
  pageData: ProductPagination;
  id?: number;
  amount = 1;
  user: LoggedInUser;

  constructor(
    private productEffects: ProductEffects,
    private entityCollectionServiceFactory: EntityCollectionServiceFactory,
    private store: Store<AppState>,
    private authStore: Store<{ authenticatedUser: LoggedInUser }>,
    private route: ActivatedRoute
  ) {
    this.productState = this.entityCollectionServiceFactory.create<Product>(EntityMap.Product);
    this.loading$ = this.productState.loading$;
    this.loaded$ = this.productState.loaded$;
    this.pageData$ = this.store.select(selectProductPaginationStateData);
    this.authStore.pipe(select(authenticationFeatureKey)).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.id = Number(p['id']);
      if (this.id) {
        this.productEffects.getProduct(this.id);
        this.product$ = this.store.select(selectProductById(this.id))
      }
    });

  }

  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }

  buy() {
    this.store.dispatch(vendingbuyEvent({
      productId: this.id,
      count: this.amount
    }))
  }
}
