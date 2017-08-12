import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  items: FirebaseListObservable<any>;
	categoryID: any;

  constructor(private af : AngularFireDatabase, private authService: AuthService, private router: Router) {}

  ngOnInit() {
  	this.categoryID = this.router.url.split('/')[5];

  	this.items = this.af.list('/topics/' + this.categoryID);
  }

}
