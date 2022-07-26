import { createAction, props } from '@ngrx/store';
import { BuyResponse } from '../../interfaces/vending/buy-response.interface';
import {
    VENDING_DEPOSIT_EVENT,
    VENDING_DEPOSIT_EVENT_SUCCESS,
    VENDING_DEPOSIT_EVENT_FAILURE,

    VENDING_BUY_EVENT,
    VENDING_RESET_EVENT,
    VENDING_BUY_EVENT_SUCCESS,

    VENDING_BUY_EVENT_FAILURE,
    VENDING_RESET_EVENT_SUCCESS,
    VENDING_RESET_EVENT_FAILURE,
} from './vending.events';


export const vendingDepositEvent = createAction(VENDING_DEPOSIT_EVENT, props<{ coins: number[] }>());
export const vendingDepositSuccessEvent = createAction(VENDING_DEPOSIT_EVENT_SUCCESS);
export const vendingDepositFailureEvent = createAction(VENDING_DEPOSIT_EVENT_FAILURE);

export const vendingbuyEvent = createAction(VENDING_BUY_EVENT, props<{ productId: number, count: number }>());
export const vendingbuySuccessEvent = createAction(VENDING_BUY_EVENT_SUCCESS, props<{ response: BuyResponse }>());
export const vendingbuyFailureEvent = createAction(VENDING_BUY_EVENT_FAILURE, props<{ err: any }>());

export const vendingresetEvent = createAction(VENDING_RESET_EVENT);
export const vendingresetSuccessEvent = createAction(VENDING_RESET_EVENT_SUCCESS);
export const vendingresetFailureEvent = createAction(VENDING_RESET_EVENT_FAILURE);
