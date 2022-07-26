import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { EntityStoreModule } from './entity/entity-store.module';

import { environment } from '../../environments/environment';
import { ProductEffects } from '../modules/product/effects/product.effects';
import { AuthenticationEffects } from './auth/auth.effects';
import { DepositEffects } from '../modules/vending/effects/deposit.effects';
import { VendingEffects } from './vending/vending.effects';
import { ProductPaginationEffects } from '../modules/product/store/product-pagination/paginations.effects';
import { productPaginationReducer } from '../modules/product/store/product-pagination/paginations.reducer';
import { vendingReducer } from './vending/vending.reducers';
import { vendingFeatureKey } from './vending/vending.state';


export const AppState = {
  productPagination: productPaginationReducer,
};

@NgModule({
  imports: [
    StoreModule.forRoot(AppState, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    EffectsModule.forRoot([ProductPaginationEffects, ProductEffects, AuthenticationEffects, DepositEffects, VendingEffects]),
    StoreModule.forFeature(vendingFeatureKey, vendingReducer),
    EntityStoreModule,
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ],
  providers: [ProductPaginationEffects, ProductEffects, DepositEffects]
})
export class AppStoreModule {}
