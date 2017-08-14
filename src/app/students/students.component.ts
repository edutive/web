import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students: any = [];
  users: any = {};

  constructor(private af: AngularFireDatabase, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.af.list('students').subscribe(snapshot => {
        snapshot.forEach(user => {
          if (user[params['id']]) {
            this.students.push(user.$key);
          }
        });
      });
    });

    firebase.database().ref('users').once('value', snapshot => {
      this.users = snapshot.val();
    });
  }
}
