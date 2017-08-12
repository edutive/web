import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
	selector: 'app-add-content',
	templateUrl: './add-content.component.html',
	styleUrls: ['./add-content.component.scss']
})
export class AddContentComponent implements OnInit {

	loading: boolean = false;

	backString: any;
	items: FirebaseListObservable<any>;

	id: any;
	question: any;
	option1: any;
	option2: any;
	option3: any;
	option4: any;
	correctOption: any;

	courseID: any;
	uid: any;

	selectedQuestions = {};

	constructor(private af: AngularFireDatabase, private authService: AuthService, private router: Router) { }

	addContent() {
		console.log("add content");
		this.loading = true;

		/*const ref = firebase.database().ref('quizes').push();

		this.id = ref.key;

		ref.set({
			id: this.id,
			question: this.question,
			option1: this.option1,
			option2: this.option2,
			option3: this.option3,
			option4: this.option4,
			correctOption: this.correctOption,

			subject: this.courseID,
			user: this.uid
		});

		firebase.database().ref('questions/' + this.id)
			.set(this.selectedQuestions).then(value => {
				this.router.navigate(['/' + this.backString]);
			});*/
		const ref = firebase.database().ref('questions').push();

		console.log("ref " + ref.key);

		this.id = ref.key;
		//firebase.database().ref('questions/' + this.id)
		ref.set({
			id: this.id,
			question: this.question,
			option1: this.option1,
			option2: this.option2,
			option3: this.option3,
			option4: this.option4,
			correctOption: this.correctOption,

			subject: this.courseID,
			user: this.uid
		}).then(value => {
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
		this.backString = this.router.url.split('/')[1] + "/" + this.router.url.split('/')[2] + "/contents";

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
