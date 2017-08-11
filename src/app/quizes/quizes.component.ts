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
	course: any;

  constructor(private af : AngularFireDatabase, private authService: AuthService, private router: Router) { 
  	this.backString = router.url.split('/')[1] + "/" + router.url.split('/')[2];

  	this.course = router.url.split('/')[2];
  	this.items = af.list('/quizes');
  }

  ngOnInit() {
  }

}
