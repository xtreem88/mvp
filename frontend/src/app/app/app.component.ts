import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import LoggedInUser from '../interfaces/auth/loggedin-user.interface';
import { appBootEvent } from '../store/auth/auth.actions';
import { authenticationFeatureKey } from '../store/auth/auth.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loggedIn = false;

  constructor(private _store: Store<{ authenticatedUser: LoggedInUser }>, private router: Router) {

  }

  ngOnInit() {
    this._store.dispatch(appBootEvent())
    this._store.pipe(select(authenticationFeatureKey)).subscribe(user => {
      this.loggedIn = user.isLoggedIn;
      if (!this.router.url.includes('login') && !user.isLoggedIn) {
        this.router.navigate(['/login'])
      }
    });
  }
}
