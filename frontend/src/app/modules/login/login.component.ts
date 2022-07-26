import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { loginEvent } from '../../store/auth/auth.actions'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import LoggedInUser from '../../interfaces/auth/loggedin-user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = true;
  hide = true;
  loginFormGroup: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private store: Store<{ authenticatedUser: LoggedInUser }>,
    private router: Router,
    private _snackBar: MatSnackBar) {
    this.observeLoginState();
  }

  ngOnInit(): void {
    this.loginFormGroup = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  private observeLoginState() {
    this.store.pipe(select('authenticatedUser')).subscribe((user) => {
      if (user.isLoggedIn) {
        this.router.navigate(['/']);
      }
      if (this.isFailedLoginAttempt(user)) {
        this._snackBar.open(user.error.message, 'ok', {
          duration: 3000
        });
      }
    });
  }

  private isFailedLoginAttempt(user: LoggedInUser) {
    return !user.isLoggedIn &&
      user.error &&
      user.error.code &&
      user.error.message;
  }

  login(event) {
    this.store.dispatch(loginEvent({
      loginEventRequest: { email: event.email, password: event.password }
    }))
  }
}
