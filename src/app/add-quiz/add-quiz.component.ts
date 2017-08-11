import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {

	loading: boolean = false;

	backString : any;
	items: FirebaseListObservable<any>;

	id: any;
	name : any;
	courseID : any;
	uid : any;

	selectedQuestions = {};

  constructor(private af : AngularFireDatabase, private authService: AuthService, private router: Router) {}

  addQuiz() {
  	this.loading = true;

  	const ref = firebase.database().ref('quizes').push();

  	this.id = ref.key;

  	ref.set({
    	id: this.id,
    	name: this.name,
    	subject: this.courseID,
    	user: this.uid
    });

    firebase.database().ref('quizesQuestions/' + this.id)
      .set(this.selectedQuestions).then(value => {
      	this.router.navigate(['/' + this.backString]);
    	});
  }

  select(item: any) {
  	this.selectedQuestions[item.$key] = !this.selectedQuestions[item.$key];

  	if (!this.selectedQuestions[item.$key]) {
  		delete this.selectedQuestions[item.$key];
  	}
  }

  ngOnInit() {
  	this.backString = this.router.url.split('/')[1] + "/" + this.router.url.split('/')[2] + "/quizes";

  	this.courseID = this.router.url.split('/')[2];
  	this.uid = this.authService.user.uid;

  	this.items = this.af.list('/questions', {
      query: {
        orderByChild: 'subject',
        equalTo: this.courseID
      }
    });
  }

}
