import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.scss']
})
export class QuizesComponent implements OnInit {

	backString : any;

	items: FirebaseListObservable<any>;
	courseID: any;

  constructor(private af : AngularFireDatabase, private authService: AuthService, private router: Router) {}

  ngOnInit() {
  	this.backString = this.router.url.split('/')[1] + "/" + this.router.url.split('/')[2];

  	this.courseID = this.router.url.split('/')[2];
  	
  	this.items = this.af.list('/quizes', {
      query: {
        orderByChild: 'subject',
        equalTo: this.courseID
      }
    });
  }

}
