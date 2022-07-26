import { NgModule } from '@angular/core';

import {
  EntityDataService,
  EntityDataModule} from '@ngrx/data';
import { ProductDataService } from '../../modules/product/store/product.data.service';
import { DepositDataService } from '../../modules/vending/store/deposit/deposit.data.service';
import { EntityMap, entityMetadata } from './entity-metadata';


@NgModule({
  imports: [
    EntityDataModule.forRoot({
      entityMetadata: entityMetadata
    })
  ],
  providers: [
    ProductDataService,
    DepositDataService
  ]
})
export class EntityStoreModule {
  constructor(
    entityDataService: EntityDataService,
    productDataService: ProductDataService,
    depositDataService: DepositDataService,
  ) {
    entityDataService.registerService(EntityMap.Product, productDataService);
    entityDataService.registerService(EntityMap.Deposit, depositDataService);
  }
}
