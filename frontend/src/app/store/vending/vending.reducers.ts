import { createReducer, on } from '@ngrx/store';

import initialVendingState from './vending.state';
import { vendingDepositEvent, vendingDepositSuccessEvent, vendingDepositFailureEvent,
  vendingbuyEvent, vendingbuyFailureEvent, vendingbuySuccessEvent } from './vending.actions';
import { VendingState } from '../../interfaces/vending/vending.state.interface';
import { BuyResponse } from '../../interfaces/vending/buy-response.interface';

const _vendingReducer = createReducer(initialVendingState,

    on(vendingDepositEvent, (state, input) => deposit(state, input)),
    on(vendingDepositSuccessEvent, (state) => depositSuccess(state)),
    on(vendingDepositFailureEvent, (state) => depositFailure(state)),

    on(vendingbuyEvent, (state, input) => vendingbuy(state, input)),
    on(vendingbuySuccessEvent, (state, input) => vendingbuySuccess(state, input.response)),
    on(vendingbuyFailureEvent, (state, input) => vendingbuyFailure(state, input)),
);


function deposit(state: VendingState, input): VendingState {
  return { ...state, deposit: {...state.deposit, loading: false, coins: input.coins } }
}

function depositSuccess(state: VendingState): VendingState {
  return { ...state, deposit: {...state.deposit, loading: false, success: true } }
}

function depositFailure(state): VendingState {
  return { ...state, deposit: {...state.deposit, loading: false, success: false} }
}

function vendingbuy(state: VendingState, input): VendingState {
  return { ...state, buy: {...state.buy, productId: input.productId, count: input.count, loading: true} }
}

function vendingbuySuccess(state: VendingState, input: BuyResponse): VendingState {
  return {
    ...state,
    buy: {...state.buy, loading: false, success: true, ...input}
  }
}

function vendingbuyFailure(state: VendingState, error): VendingState {
  return { ...state, buy: {...state.buy, error: { code: error.err.code, message: error.err.message }, loading: false, success: false} }
}


export function vendingReducer(state, action) {
  return _vendingReducer(state, action);
}
