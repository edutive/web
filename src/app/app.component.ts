import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { AuthService } from './auth/auth.service';
import { Discipline } from './discipline/discipline';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  openMenu: boolean = false;
  disciplineID: string;
  discipline: Discipline;

  constructor(public authService: AuthService, private af: AngularFireDatabase, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.openMenu = false;

    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        const parts = val.url.split('/');
        const disciplines = parts && parts.length >= 3 && parts[1] === 'discipline' && parts[2] !== 'add';

        if (disciplines) {
          this.disciplineID = parts[2];
          this.af.object('/subjects/' + parts[2]).subscribe(subject => {
            this.discipline = subject;
          });
        } else {
          this.discipline = undefined;
        }
      }
    });

    if (localStorage.getItem('user')) {
      this.authService.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  onClickOutside(event: Object) {
    if (event && event['value'] === true) {
      this.openMenu = false;
    }
  }

  logout() {
    this.openMenu = false;

    this.authService.logout();
    this.router.navigate(['/login']);
  }

  editProfile() {
    this.openMenu = false;
    this.router.navigate(['/profile/edit']);
  }
}
