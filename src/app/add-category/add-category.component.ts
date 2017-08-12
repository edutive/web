import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

	loading: boolean = false;

	backString : any;

	id: any;
	name : any;
	courseID : any;

  constructor(private af : AngularFireDatabase, private authService: AuthService, private router: Router) {}

  addCategory() {
  	const ref = firebase.database().ref('categories/' + this.courseID).push();

  	this.id = ref.key;

  	ref.set({
    	icon: "hourglass",
    	id: this.id,
    	name: this.name,
    }).then(value => {
    	this.router.navigate(['/' + this.backString]);
    });

  }

  ngOnInit() {
  	this.backString = this.router.url.split('/')[1] + "/" + this.router.url.split('/')[2] + "/forum";

  	this.courseID = this.router.url.split('/')[2];
  }

}
