import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';

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
  correctOption: any = 'a';

  courseID: any;

  selectedQuestions = {};

  constructor(private af: AngularFireDatabase, private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.backString = this.router.url.split('/')[1] + '/' + this.router.url.split('/')[2] + '/contents';

    this.route.params.subscribe(param => {
      this.courseID = param['id'];

      if (param['content']) {
        this.id = param['content'];
        this.af.object('/questions/' + param['content']).subscribe(question => {
          this.question = question.question;
          this.option1 = question.option1;
          this.option2 = question.option2;
          this.option3 = question.option3;
          this.option4 = question.option4;
          this.correctOption = question.correctOption;
        });
      }
    });

    this.items = this.af.list('/questions', {
      query: {
        orderByChild: 'subject',
        equalTo: this.courseID
      }
    });
  }

  addContent() {
    this.loading = true;

    let ref: any;
    if (this.id) {
      ref = firebase.database().ref('questions/' + this.id);
    } else {
      ref = firebase.database().ref('questions').push();
      this.id = ref.key;
    }

    ref
      .set({
        id: this.id,
        question: this.question,
        option1: this.option1,
        option2: this.option2,
        option3: this.option3 ? this.option3 : null,
        option4: this.option4 ? this.option4 : null,
        correctOption: this.correctOption,
        subject: this.courseID,
        user: this.authService.user.uid
      })
      .then(value => {
        this.router.navigate(['/' + this.backString]);
      });
  }

  disableButton() {
    return !this.question || !this.option1 || !this.option2;
  }
}
