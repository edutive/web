import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  messageText: any;

  messages: FirebaseListObservable<any>;
  usersList: any;
  users: {};
  categoryID: any;
  topicID: any;
  userID: any;

  topic: any;

  constructor(private af: AngularFireDatabase, private authService: AuthService, private router: Router) {}

  send() {
    firebase.database().ref('forums/' + this.topicID + '/' + new Date().getTime()).set({
      date: new Date().getTime(),
      sender: this.userID,
      text: this.messageText
    });

    this.messageText = '';
  }

  ngOnInit() {
    this.categoryID = this.router.url.split('/')[5];
    this.topicID = this.router.url.split('/')[7];
    this.userID = this.authService.user.uid;

    firebase.database().ref('topics/' + this.categoryID + '/' + this.topicID).once('value', snapshot => {
      this.topic = snapshot.val();
    });

    this.messages = this.af.list('forums/' + this.topicID);

    firebase.database().ref('users').once('value', snapshot => {
      this.users = snapshot.val();
    });
  }
}
