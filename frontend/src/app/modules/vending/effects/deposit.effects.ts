import { Injectable } from '@angular/core';
import { EntityCollectionService, EntityCollectionServiceFactory } from '@ngrx/data';
import { EntityMap } from '../../../store/entity/entity-metadata';



@Injectable()
export class DepositEffects {
  depositService: EntityCollectionService<number>;
  constructor(
    private entityCollectionServiceFactory: EntityCollectionServiceFactory,
  ) {
    this.depositService = this.entityCollectionServiceFactory.create<number>(EntityMap.Deposit);
  }

  getAllowedAmounts() {
    this.depositService.load();
  }
}
