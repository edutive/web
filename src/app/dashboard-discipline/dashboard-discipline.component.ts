import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-discipline',
  templateUrl: './dashboard-discipline.component.html',
  styleUrls: ['./dashboard-discipline.component.scss']
})
export class DashboardDisciplineComponent implements OnInit {

	icon: string;
	name: string;
	id: any;
	uid: any;

	loading: boolean = false;

  error: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  addDiscipline() {
  	this.loading = true;

  	this.icon = "notebook";

  	this.uid = this.authService.user.uid;

  	const ref = firebase.database().ref('subjects').push();

  	this.id = ref.key;

  	ref.set({
    	icon: this.icon,
    	id: this.id,
    	name: this.name,
    	user: this.uid
    }).then(value => {
      this.router.navigate(['/']);
    });;
  }
}

