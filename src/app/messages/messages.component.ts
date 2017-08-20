import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

	messageText: any;
	lastMessageDate: any;

  messages: FirebaseListObservable<any>;
  usersList: any;
  users: {};
  uid: any;
  userID: any; // other user
  chatID: any;

  constructor(private af: AngularFireDatabase, private authService: AuthService, private router: Router) {}

  send() {
  	this.lastMessageDate = new Date().getTime();

    firebase.database().ref('messages/' + this.chatID + '/' + this.lastMessageDate).set({
      date: this.lastMessageDate,
      sender: this.uid,
      text: this.messageText
    });

    this.af
      .object('chats/' + this.uid + "/" + this.chatID)
      .update({
      	chat: this.chatID,
      	lastMessage: this.messageText,
      	message: this.lastMessageDate,
      	user: this.userID
      });

    this.af
      .object('chats/' + this.userID + "/" + this.chatID)
      .update({
      	chat: this.chatID,
      	lastMessage: this.messageText,
      	message: this.lastMessageDate,
      	user: this.uid
      });
    
    this.messageText = '';
  }

  ngOnInit() {
    this.chatID = this.router.url.split('/')[2];
    this.uid = this.authService.user.uid;

    firebase.database().ref('users').once('value', snapshot => {
      this.users = snapshot.val();
    });

    firebase.database().ref('chats/' + this.uid + "/" + this.chatID).once('value', snapshot => {
      this.userID = snapshot.val().user;
    });

    this.messages = this.af.list('messages/' + this.chatID);
  }
}
