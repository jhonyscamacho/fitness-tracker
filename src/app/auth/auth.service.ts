import { TrainingService } from './../training/training.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { AngularFireAuth } from 'angularfire2/auth';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService
  ) {}

  registerUser(authData: AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
  }

  login(authData: AuthData) {
    console.log(authData.email);
    console.log(authData.password);
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });

    this.authSuccessfuly();
  }

  logout() {
    this.trainingService.cancelSubscriptions();
    this.afAuth.auth.signOut();
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfuly() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    // This is the page to where
    // the application will send the user after login.
    this.router.navigate(['/training']);
  }
}
