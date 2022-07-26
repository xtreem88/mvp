import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import LoggedInUser from '../../interfaces/auth/loggedin-user.interface';
import { authenticationFeatureKey } from '../../store/auth/auth.state';

const buyerRoutes = [
  {
    1: 'vending',
    2: 'deposit'
  },
  {
    1: 'product'
  },
  {
    1: 'product',
    2: 'view',
    3: 'any'
  }
];

const sellerRoutes = [
  {
    1: 'product'
  },
  {
    1: 'product',
    2: 'add'
  },
  {
    1: 'product',
    2: 'any',
    3: 'edit'
  },
  {
    1: 'product',
    2: 'view',
    3: 'any'
  }
];

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(private _router: Router, private store: Store<{ authenticatedUser: LoggedInUser }>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let paths = state.url.split('/');
    return this.store.pipe(select(authenticationFeatureKey)).pipe(map((user: LoggedInUser) => {
      if (user.role === 'buyer') {
        let pass = false
        pass = this.checkAccess(pass, paths, buyerRoutes);
        return pass;
      } else if (user.role === 'seller') {
        let pass = false
        pass = this.checkAccess(pass, paths, sellerRoutes);
        return pass;
      }
      else {
        this._router.navigate(['/']);
        return false;
      }
    }), catchError(() => {
      this._router.navigate(['/']);
      return of(false);
    }))
  }

  private checkAccess(pass: boolean, paths: string[], routes: any[]) {
    routes.forEach((path) => {
      const keys = Object.keys(path);
      const correct = [];

      paths.forEach((url, i) => {
        if (paths[i] && path[i] !== 'any') {
          correct.push(path[i] === paths[i]);
        }
      });

      if (!pass) {
        pass = correct.indexOf(false) === -1
      }
    });
    return pass;
  }
}
