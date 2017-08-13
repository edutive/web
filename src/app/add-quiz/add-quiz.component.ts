import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {
  loading: boolean = false;

  backString: any;
  items: FirebaseListObservable<any>;

  name: string;
  quizID: string;
  courseID: string;

  selectedQuestions = {};

  constructor(private af: AngularFireDatabase, private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.backString = this.router.url.split('/')[1] + '/' + this.router.url.split('/')[2] + '/quizes';

    this.route.params.subscribe(params => {
      this.courseID = params['id'];

      if (params['quiz']) {
        this.quizID = params['quiz'];
        this.af.object('/quizes/' + params['quiz']).subscribe(subject => {
          this.name = subject.name;
        });

        this.af.list('/quizesQuestions/' + this.quizID).subscribe(questions => {
          questions.forEach(question => {
            this.selectedQuestions[question.$key] = question.$value;
          });
        });
      }

      this.items = this.af.list('/questions', {
        query: {
          orderByChild: 'subject',
          equalTo: this.courseID
        }
      });
    });
  }

  addQuiz() {
    this.loading = true;

    let ref: any;
    if (this.quizID) {
      ref = firebase.database().ref('quizes/' + this.quizID);
    } else {
      ref = firebase.database().ref('quizes').push();
      this.quizID = ref.key;
    }

    Object.keys(this.selectedQuestions).forEach(key => {
      if (!this.selectedQuestions[key]) {
        delete this.selectedQuestions[key];
      }
    });

    ref.set({
      id: this.quizID,
      name: this.name,
      subject: this.courseID,
      user: this.authService.user.uid
    });

    firebase.database().ref('quizesQuestions/' + this.quizID).set(this.selectedQuestions).then(value => {
      this.router.navigate(['/' + this.backString]);
    });
  }
}
