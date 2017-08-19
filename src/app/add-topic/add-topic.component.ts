import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.scss']
})
export class AddTopicComponent implements OnInit {
  loading: boolean = false;

  backString: any;

  id: any;
  name: any;
  categoryID: any;
  uid: any;

  constructor(private af: AngularFireDatabase, private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  addTopic() {
    const ref = firebase.database().ref('topics/' + this.categoryID).push();

    this.id = ref.key;

    this.uid = this.authService.user.uid;

    this.route.params.subscribe(params => {
      firebase.database().ref('subjects/' + params['id']).once('value', subjectSnapshop => {
        firebase.database().ref('subjects/' + params['id'] + '/forum').set(subjectSnapshop.val().forum + 1);
      });
    });

    ref
      .set({
        id: this.id,
        name: this.name,
        user: this.uid
      })
      .then(value => {
        this.router.navigate(['/' + this.backString]);
      });
  }

  ngOnInit() {
    this.backString = this.router.url.split('/')[1] + '/' + this.router.url.split('/')[2] + '/forum/category/' + this.router.url.split('/')[5];

    this.categoryID = this.router.url.split('/')[5];
  }
}
