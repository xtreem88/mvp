import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { VendingService } from '../../services/vending/vending.service';
import { vendingbuyEvent, vendingbuyFailureEvent, vendingbuySuccessEvent, vendingDepositEvent,
  vendingDepositFailureEvent, vendingDepositSuccessEvent } from './vending.actions';
import { refreshEvent } from '../auth/auth.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiError } from '../../interfaces/api/error.interface';

@Injectable()
export class VendingEffects {

  constructor(
    private _actions$: Actions,
    private vendingService: VendingService,
    private snackBar: MatSnackBar,
  ) { }

  deposit$ = createEffect(() => this._actions$.pipe(
    ofType(vendingDepositEvent),
    mergeMap((payload) => this.vendingService.deposit(payload.coins).pipe(
      map(() => vendingDepositSuccessEvent()),
      map(() => {
        this.snackBar.open("Deposit completed successfully", 'ok', {
          duration: 3000
        });
        return refreshEvent();
      }),
      catchError((err: ApiError) => {
        this.displayError(err);
        return of(vendingDepositFailureEvent())
      })))
  ))

  buy$ = createEffect(() => this._actions$.pipe(
    ofType(vendingbuyEvent),
    mergeMap((payload) => this.vendingService.buy(payload.productId, payload.count).pipe(
      map((response) => vendingbuySuccessEvent({response})),
      map((response) => {
        this.snackBar.open(`Purchase completed successfully. Your change is: ${response?.response?.change?.join(', ')}`, 'ok', {
          duration: 3000
        });
        return refreshEvent();
      }),
      catchError((err) => {
        this.displayError(err);
        return of(vendingbuyFailureEvent(err))
      })))
  ))

  private displayError(err: ApiError) {
    if (err?.message) {
      this.snackBar.open(err.message, 'ok', {
        duration: 3000
      });
    }
    err?.data?.errors.forEach(error => {
      this.snackBar.open(error.msg, 'ok', {
        duration: 3000
      });
    });
  }
}
