import { createAction, props } from '@ngrx/store';
import LoginRequest from '../../interfaces/auth/login-request.interface';
import {
    LOGIN_SESSION_VALIDITY_EVENT,
    LOGIN_SESSION_VALIDITY_EVENT_SUCCESS,
    LOGIN_SESSION_VALIDITY_EVENT_FAILURE,

    LOGIN_EVENT,
    LOGOUT_EVENT,
    LOGIN_EVENT_SUCCESS,

    LOGIN_EVENT_FAILURE,
    LOGOUT_EVENT_SUCCESS,
    LOGOUT_EVENT_FAILURE,

    APP_BOOT_EVENT,
    APP_BOOT_EVENT_SESSION_AVAILABLE,
    APP_BOOT_EVENT_SESSION_UNAVAILABLE,
    REFRESH_EVENT,
    REFRESH_EVENT_SUCCESS,
    REFRESH_EVENT_FAILURE
} from './auth.events';


export const loginSessionValidityEvent = createAction(LOGIN_SESSION_VALIDITY_EVENT, props<{ isLongLived: boolean }>());
export const loginSessionValiditySuccessEvent = createAction(LOGIN_SESSION_VALIDITY_EVENT_SUCCESS);
export const loginSessionValidityFailureEvent = createAction(LOGIN_SESSION_VALIDITY_EVENT_FAILURE);


export const loginEvent = createAction(LOGIN_EVENT, props<{ loginEventRequest: LoginRequest }>());
export const loginSuccessEvent = createAction(LOGIN_EVENT_SUCCESS, props<{ authenticatedUser: any }>());
export const loginFailureEvent = createAction(LOGIN_EVENT_FAILURE, props<{ err: any }>());

export const logoutEvent = createAction(LOGOUT_EVENT);
export const logoutSuccessEvent = createAction(LOGOUT_EVENT_SUCCESS);
export const logoutFailureEvent = createAction(LOGOUT_EVENT_FAILURE);

export const appBootEvent = createAction(APP_BOOT_EVENT)
export const appBootEventSessionAvailable = createAction(APP_BOOT_EVENT_SESSION_AVAILABLE, props<{ authenticatedUser: any }>())
export const appBootEventSessionUnavailable = createAction(APP_BOOT_EVENT_SESSION_UNAVAILABLE)

export const refreshEvent = createAction(REFRESH_EVENT);
export const refreshSuccessEvent = createAction(REFRESH_EVENT_SUCCESS, props<{ authenticatedUser: any }>());
export const refreshFailureEvent = createAction(REFRESH_EVENT_FAILURE, props<{ err: any }>());
