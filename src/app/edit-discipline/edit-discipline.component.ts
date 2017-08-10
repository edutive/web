import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-discipline',
  templateUrl: './edit-discipline.component.html',
  styleUrls: ['./edit-discipline.component.scss']
})
export class EditDisciplineComponent implements OnInit {

  icon: string;
	name: string;
	id: any;
	uid: any;

	loading: boolean = false;

  error: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  editDiscipline() {}


}
