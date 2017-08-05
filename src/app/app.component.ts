import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  openMenu: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.openMenu = false;

    if (localStorage.getItem('user')) {
      this.authService.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  logout() {
    this.openMenu = false;

    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
