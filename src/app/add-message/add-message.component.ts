import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.scss']
})
export class AddMessageComponent implements OnInit {

	uid: any;

	items: FirebaseListObservable<any>;

	search: string = '';

	chatID: any;

  constructor(private af: AngularFireDatabase, private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
  	this.uid = this.authService.user.uid;

  	this.items = this.af.list('users', {
        query: {
          orderByChild: 'firstname'
        }
      });

  }

  addChat(reminderID: any) {
  	this.af.list('chats/' + this.uid, {
        query: {
          orderByChild: 'user',
          equalTo: reminderID
        }
      }).subscribe(chats => {
      	if (chats.length > 0) {
      		this.router.navigate(['/messages/' + chats[0].chat]);
      	} else {
      		const ref = firebase.database().ref('messages/').push();

      		this.chatID = ref.key;

      		firebase
			      .database()
			      .ref('chats/' + this.uid + "/" + this.chatID)
			      .set({
			        chat: this.chatID,
			        lastMessage: '',
			        message: new Date().getTime(),
			        user: reminderID
			      });

			      firebase
			      .database()
			      .ref('chats/' + reminderID + "/" + this.chatID)
			      .set({
			        chat: this.chatID,
			        lastMessage: '',
			        message: new Date().getTime(),
			        user: this.uid
			      }).then(value => {
			        this.router.navigate(['/messages/' + this.chatID]);
			      });
      	}
      });
  }
}
