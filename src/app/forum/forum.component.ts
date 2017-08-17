import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

	items: FirebaseListObservable<any>;
	courseID: any;

  constructor(private af : AngularFireDatabase, private authService: AuthService, private router: Router) {}

  ngOnInit() {
  	this.courseID = this.router.url.split('/')[2];

  	this.items = this.af.list('/categories/' + this.courseID);
  }

}
