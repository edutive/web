import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.scss']
})
export class QuizesComponent implements OnInit {
  items: FirebaseListObservable<any>;

  constructor(private af: AngularFireDatabase, private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.items = this.af.list('/quizes', {
        query: {
          orderByChild: 'subject',
          equalTo: params['id']
        }
      });
    });
  }

  openQuiz(quiz: any) {
    this.route.params.subscribe(params => {
      this.router.navigate(['/discipline/', params['id'], 'quizes', quiz.id]);
    });
  }
}
