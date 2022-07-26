import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, exhaustMap, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { AuthenticationService } from '../../services/auth/auth.service';
import { of } from 'rxjs';
import {
    loginEvent,
    logoutEvent,
    loginSuccessEvent,
    loginFailureEvent,
    logoutSuccessEvent,
    logoutFailureEvent,
    appBootEventSessionAvailable,
    appBootEventSessionUnavailable,
    appBootEvent,
    refreshEvent,
    refreshSuccessEvent,
    refreshFailureEvent} from './auth.actions';
import { mapToLoggedInUser, mapUserToLoggedInUser } from '../../utilities/mappers/auth.model.mapper';
import { UserService } from '../../services/user/user.service';
import { Store } from '@ngrx/store';
import { authenticationFeatureKey } from './auth.state';
import LoggedInUser from '../../interfaces/auth/loggedin-user.interface';

@Injectable()
export class AuthenticationEffects {

    constructor(
      private _actions$: Actions,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private store: Store<{ authenticatedUser: LoggedInUser }>
    ) { }

    setInitialAuthState$ = createEffect(() => this._actions$.pipe(
        ofType(appBootEvent),
        mergeMap(() => this.authenticationService.getUserAuth().pipe(
            map((authenticationResponse) => appBootEventSessionAvailable({ authenticatedUser: mapToLoggedInUser(authenticationResponse) })),
            catchError(() => of(appBootEventSessionUnavailable()))))
    ))


    loginUsingEmailAndPassword$ = createEffect(() => this._actions$.pipe(
        ofType(loginEvent),
        exhaustMap(payload => this.authenticationService.loginUsingEmailAndPassword(payload.loginEventRequest.email, payload.loginEventRequest.password).pipe(
          tap((authenticationResponse) => this.authenticationService.saveSession(authenticationResponse.access_token.token)),
          map((authenticationResponse) => loginSuccessEvent({ authenticatedUser: mapToLoggedInUser(authenticationResponse) })),
          catchError((err) => of(loginFailureEvent({ err: err }))))))
    )

    logout$ = createEffect(() => this._actions$.pipe(
        ofType(logoutEvent),
        exhaustMap(() => this.authenticationService.logout().pipe(
            map(() => logoutSuccessEvent()),
            catchError(() => of(logoutFailureEvent())))))
    )

    refreshUser$ = createEffect(() => this._actions$.pipe(
      ofType(refreshEvent),
      withLatestFrom(this.store.select(authenticationFeatureKey)),
      exhaustMap(payload => this.userService.getUser(payload[1].uuid).pipe(
        map((authenticationResponse) => refreshSuccessEvent({ authenticatedUser: mapUserToLoggedInUser(authenticationResponse) })),
        catchError((err) => of(refreshFailureEvent({ err: err }))))))
    )
}
