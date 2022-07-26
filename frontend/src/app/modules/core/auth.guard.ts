import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import LoggedInUser from '../../interfaces/auth/loggedin-user.interface';
import { authenticationFeatureKey } from '../../store/auth/auth.state';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router, private store: Store<{ authenticatedUser: LoggedInUser }>) {
  }

  canActivate(): Observable<boolean> {
    return this.store.pipe(select(authenticationFeatureKey)).pipe(map((user: LoggedInUser) => {
      if (user.isLoggedIn && user.email) {
        return true
      }
      else {
        this._router.navigate(['/login']);
        return false
      }
    }), catchError(() => {
      this._router.navigate(['/login']);
      return of(false);
    }))
  }
}
