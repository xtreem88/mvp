import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DepositEffects } from './effects/deposit.effects';
import { EntityCollectionService, EntityCollectionServiceFactory } from '@ngrx/data';
import { AppState } from '../../interfaces/state/app-state.interface';
import { EntityMap } from '../../store/entity/entity-metadata';
import { Observable } from 'rxjs';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { vendingDepositEvent } from '../../store/vending/vending.actions';

@Component({
  selector: 'app-vending',
  templateUrl: './vending.component.html',
  styleUrls: ['./vending.component.css']
})
export class VendingComponent implements OnInit {
  isLoading = true;
  hide = true;
  vendingFormGroup: FormGroup;
  depositState: EntityCollectionService<number>;
  allowedAmounts$: Observable<number[]>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  amountsCtrl = new FormControl('');
  coins: number[] = [];
  @ViewChild('amountInput') amountInput: ElementRef<HTMLInputElement>;
  constructor(
    private _formBuilder: FormBuilder,
    private depositEffects: DepositEffects,
    private entityCollectionServiceFactory: EntityCollectionServiceFactory,
    private store: Store<AppState>) {
    this.depositState = this.entityCollectionServiceFactory.create<number>(EntityMap.Deposit);
    this.allowedAmounts$ = this.depositState.entities$;
    this.loading$ = this.depositState.loading$;
    this.loaded$ = this.depositState.loaded$;
  }

  ngOnInit(): void {
    this.depositEffects.getAllowedAmounts()
    this.vendingFormGroup = this._formBuilder.group({
      amounts: [null, [Validators.required]],
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.coins.push(Number(value));
    }
    this.amountsCtrl.setValue(value);
  }

  remove(coin: number): void {
    const index = this.coins.indexOf(coin);

    if (index >= 0) {
      this.coins.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.coins.push(Number(event.option.viewValue));
    this.amountsCtrl.setValue(event.option.viewValue);
    this.amountInput.nativeElement.blur()
  }

  deposit() {
    this.store.dispatch(vendingDepositEvent({
      coins: this.coins
    }));
  }
}
