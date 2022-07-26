import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import LoggedInUser from '../../interfaces/auth/loggedin-user.interface';

@Injectable()
export class AppClientHttpInterceptor implements HttpInterceptor {

  authenticatedUser: LoggedInUser = { isLoggedIn: false }

  constructor(private _store: Store<{ authenticatedUser: LoggedInUser }>) {
    this._store.pipe(select('authenticatedUser')).subscribe((item) => {
      this.authenticatedUser = item
    })
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authenticatedUser.isLoggedIn) {
      request = request.clone({
        setHeaders: {
          Authorization: this.authenticatedUser.token,
        }
      });
    }
    return next.handle(request);
  }
}
