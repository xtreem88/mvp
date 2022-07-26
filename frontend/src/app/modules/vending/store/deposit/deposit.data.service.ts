import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  DefaultDataService,
  HttpUrlGenerator} from '@ngrx/data';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityMap } from '../../../../store/entity/entity-metadata';
import { VendingService } from '../../../../services/vending/vending.service';

@Injectable()
export class DepositDataService extends DefaultDataService<number> {
  subscription: Subscription[] = [];

  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private vendingService: VendingService,
  ) {
    super(EntityMap.Deposit, http, httpUrlGenerator);
  }

  getAll(): Observable<number[]> {
    return this.vendingService.getMetaData()
      .pipe(
        map((response) => response.allowedAmounts));
  }
}
