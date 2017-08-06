import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  firstName: string;
  lastName: string;

  loading: boolean = false;
  error: string;

  constructor(public afAuth: AngularFireAuth, public authService: AuthService, private router: Router) {}

  ngOnInit() {}

  login() {
    this.loading = true;

    this.authService.login(this.email, this.password, (authUser, error) => {
      if (!error) {
        this.authService.getUser(authUser.uid, user => {
          this.authService.user = user;
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/']);
        });
      } else {
        this.loading = false;
        this.error = error;
      }
    });
  }

  loginFb() {
    this.loading = true;

    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(
        (success) => {
          const user = {
            uid: this.afAuth.auth.currentUser.uid,
            email: this.afAuth.auth.currentUser.email,
            firstname: this.afAuth.auth.currentUser.displayName.split(' ')[0],
            lastname: this.afAuth.auth.currentUser.displayName.split(' ')[1]
          };
          
          this.authService.insert(user, (databaseUser, errorInsert) => {
            this.authService.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/']);
          });
      }).catch(
        (err) => {
          this.loading = false;
          this.error = err.message;
      });
  }
}
