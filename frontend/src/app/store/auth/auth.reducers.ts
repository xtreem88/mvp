import { createReducer, on } from '@ngrx/store';
import initialLoggedInUserState from './auth.state';
import {
  loginSessionValidityEvent, loginSessionValiditySuccessEvent, loginSessionValidityFailureEvent,
  loginEvent, loginSuccessEvent, loginFailureEvent,
  logoutEvent, logoutSuccessEvent, logoutFailureEvent,
  appBootEvent, appBootEventSessionAvailable, appBootEventSessionUnavailable, refreshEvent, refreshSuccessEvent, refreshFailureEvent
} from './auth.actions';
import LoggedInUser from '../../interfaces/auth/loggedin-user.interface';

const _authReducer = createReducer(initialLoggedInUserState,

  on(loginSessionValidityEvent, (state) => session(state)),
  on(loginSessionValiditySuccessEvent, (state) => sessionSuccess(state)),
  on(loginSessionValidityFailureEvent, (state) => sessionFailure(state)),

  on(loginEvent, (state) => login(state)),
  on(loginSuccessEvent, (state, user) => loginSuccess(state, user)),
  on(loginFailureEvent, (state, user) => loginFailure(state, user)),

  on(logoutEvent, (state) => logout(state)),
  on(logoutSuccessEvent, (state) => logoutSuccess(state)),
  on(logoutFailureEvent, (state) => logoutFailure(state)),

  on(appBootEvent, (state) => appBoot(state)),
  on(appBootEventSessionAvailable, (state, input) => appBootEventSuccess(state, input)),
  on(appBootEventSessionUnavailable, (state) => appBootEventFailure(state)),

  on(refreshEvent, (state) => login(state)),
  on(refreshSuccessEvent, (state, user) => refreshSuccess(state, user)),
  on(refreshFailureEvent, (state, user) => refreshFailure(state, user)),
);


function session(state): LoggedInUser {
  return { ...state }
}

function sessionSuccess(state): LoggedInUser {
  return { ...state }
}

function sessionFailure(state): LoggedInUser {
  return { ...state }
}

function appBoot(state): LoggedInUser {
  return { ...state }
}

function appBootEventSuccess(state, input): LoggedInUser {
  return {
    ...state,
    email: input.authenticatedUser.email,
    uuid: input.authenticatedUser.uuid,
    displayName: input.authenticatedUser.name,
    token: input.authenticatedUser.token,
    role: input.authenticatedUser.role,
    balance: input.authenticatedUser.balance,
    isLoggedIn: true
  }
}

function appBootEventFailure(state): LoggedInUser {
  return { ...state }
}

function login(state): LoggedInUser {
  return { ...state }
}

function loginSuccess(state, input): LoggedInUser {
  return {
    ...state,
    email: input.authenticatedUser.email,
    uuid: input.authenticatedUser.uuid,
    displayName: input.authenticatedUser.name,
    token: input.authenticatedUser.token,
    role: input.authenticatedUser.role,
    balance: input.authenticatedUser.balance,
    isLoggedIn: true
  }
}

function refreshSuccess(state, input): LoggedInUser {
  return {
    ...state,
    email: input.authenticatedUser.email,
    displayName: input.authenticatedUser.name,
    role: input.authenticatedUser.role,
    balance: input.authenticatedUser.balance,
  }
}

function refreshFailure(state, error): LoggedInUser {
  return { ...state, error: { code: error.err.code, message: error.err.message } }
}

function loginFailure(state, error): LoggedInUser {
  return { ...state, error: { code: error.err.code, message: error.err.message }, isLoggedIn: false }
}

function logout(state): LoggedInUser {
  return { ...state, isLoggedIn: false }
}

function logoutSuccess(state): LoggedInUser {
  return { isLoggedIn: false }
}

function logoutFailure(state): LoggedInUser {
  return { ...state }
}

export function authReducer(state, action) {
  return _authReducer(state, action);
}
