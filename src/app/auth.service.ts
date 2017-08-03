import { Injectable } from "@angular/core";

import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log("Success!", value);
      })
      .catch(err => {
        console.log("Something went wrong:", err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log("Nice, it worked!");
      })
      .catch(err => {
        console.log("Something went wrong:", err.message);
      });
  }

  logout() {
    this.firebaseAuth.auth.signOut();
  }

  insert(firstName:string, lastName: string) {
    var user = firebase.auth().currentUser;

    console.log("id " + user.uid);
    console.log("firstName " + firstName);
    console.log("lastName " + lastName);

    firebase.database().ref("users/" + user.uid).set({
      firstName: firstName,
      lastName: lastName
    }).then(value => {
        console.log("Nome e sobrenome alterados!");
      })
      .catch(err => {
        console.log("Something went wrong:", err.message);
      });
  }
}
