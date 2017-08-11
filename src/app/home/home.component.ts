import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  uid: any;
  items: FirebaseListObservable<any>;

  constructor(private af: AngularFireDatabase, private authService: AuthService, private router: Router) {
    this.uid = this.authService.user.uid;
  }

  ngOnInit() {
    this.items = this.af.list('/subjects', {
      query: {
        orderByChild: 'user',
        equalTo: this.uid
      }
    });
  }

  openDiscipline(id: string) {
    this.router.navigate(['discipline/', id]);
  }
}
