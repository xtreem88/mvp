import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductEffects } from '../effects/product.effects';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EntityCollectionService, EntityCollectionServiceFactory } from '@ngrx/data';
import { EntityMap } from '../../../store/entity/entity-metadata';
import { Product } from '../../../interfaces/product/product.interface';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../interfaces/state/app-state.interface';
import { ProductPagination } from '../../../interfaces/product/product-pagination.interface';
import { selectProductPaginationStateData } from '../store/product-pagination/paginations.selectors';
import { authenticationFeatureKey } from '../../../store/auth/auth.state';
import LoggedInUser from '../../../interfaces/auth/loggedin-user.interface';

interface ProductData {
  id: number;
}

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'productName', 'amountAvailable', 'cost', 'actions'];
  dataSource: MatTableDataSource<ProductData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  productState: EntityCollectionService<Product>;
  products$: Observable<Product[]>;
  subscription: Subscription[] = [];
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  pageData$: Observable<ProductPagination>;
  pageData: ProductPagination;
  userId: number;

  constructor(
    private productEffects: ProductEffects,
    private entityCollectionServiceFactory: EntityCollectionServiceFactory,
    private store: Store<AppState>,
    private authStore: Store<{ authenticatedUser: LoggedInUser }>,
  ) {
    this.productState = this.entityCollectionServiceFactory.create<Product>(EntityMap.Product);
    this.products$ = this.productState.entities$;
    this.loading$ = this.productState.loading$;
    this.loaded$ = this.productState.loaded$;
    this.pageData$ = this.store.select(selectProductPaginationStateData);
    this.subscription.push(this.products$.subscribe(products => {
      this.dataSource = new MatTableDataSource(products);
    }));

    this.authStore.pipe(select(authenticationFeatureKey)).subscribe(user => {
      this.userId = user?.uuid;
    });
  }

  ngOnInit(): void {
    this.productEffects.getProducts();
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }

  paginate(page: PageEvent) {
    this.productEffects.getProducts({
      page: page.pageIndex + 1,
      per_page: page.pageSize,
      total: page.length
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProduct(id: number) {
    this.productEffects.deleteProduct(id);
  }
}
