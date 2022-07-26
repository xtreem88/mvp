import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import LoggedInUser from '../../interfaces/auth/loggedin-user.interface';
import { logoutEvent } from '../../store/auth/auth.actions';
import { authenticationFeatureKey } from '../../store/auth/auth.state';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class AppNavBarComponent implements OnInit {
  displayName = '';
  balance = 0;

  constructor(private store: Store<{ authenticatedUser: LoggedInUser }>) {

  }

  ngOnInit() {
    this.store.pipe(select(authenticationFeatureKey)).subscribe(user => {
      this.displayName = user.email;
      this.balance = user.balance;
    })
  }

  logout() {
    this.store.dispatch(logoutEvent());
  }
}
