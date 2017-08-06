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

  constructor(private af : AngularFireDatabase, private authService: AuthService, private router: Router) {
  	this.uid = this.authService.user.uid;

  	this.items = af.list('/subjects');
  }



  ngOnInit() {}
}
