import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: any;

  constructor(private firebaseAuth: AngularFireAuth, private af: AngularFireDatabase) {}

  signup(email: string, password: string, callback: any) {
    this.firebaseAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        callback(value);
      })
      .catch(error => {
        callback(null, error);
      });
  }

  login(email: string, password: string, callback: any) {
    this.firebaseAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        callback(value);
      })
      .catch(error => {
        callback(null, error);
      });
  }

  logout() {
    this.user = undefined;
    this.firebaseAuth.auth.signOut();
    localStorage.removeItem('user');
  }

  insert(user: any, callback: any) {
    firebase
      .database()
      .ref('users/' + user.uid)
      .set(user)
      .then(value => {
        callback(value);
      })
      .catch(error => {
        callback(null, error);
      });
  }

  updateUser(user: any, callback: any) {
    this.af
      .object('users/' + user.uid)
      .update(user)
      .then(() => {
        callback();
      }).catch(error => {
        console.log(error);
      });
  }

  getUser(uid: string, callback: any) {
    firebase.database().ref('users/' + uid).once('value', snapshot => {
      callback(snapshot.val());
    });
  }
}
