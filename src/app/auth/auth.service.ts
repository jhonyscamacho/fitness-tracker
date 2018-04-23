import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      // Temporarily fake random ID
      userId: Math.round(Math.random() * 10000).toString()
    };

    this.authSuccessfuly();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      // Temporarily fake random ID
      userId: Math.round(Math.random() * 10000).toString()
    };

    this.authSuccessfuly();
  }

  logout() {
    this.user = null;

    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccessfuly() {
    this.authChange.next(true);
    // This is the page to where
    // the application will send the user after login.
    this.router.navigate(['/training']);
  }
}
