import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit {
  backString: any;

  items: FirebaseListObservable<any>;
  courseID: any;

  constructor(private af: AngularFireDatabase, private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.backString = this.router.url.split('/')[1] + '/' + this.router.url.split('/')[2];

    this.courseID = this.router.url.split('/')[2];

    this.items = this.af.list('/questions', {
      query: {
        orderByChild: 'subject',
        equalTo: this.courseID
      }
    });
  }

  openContent(item: any) {
    this.route.params.subscribe(param => {
      this.router.navigate(['/discipline/', param['id'], 'contents', item.id]);
    });
  }
}
