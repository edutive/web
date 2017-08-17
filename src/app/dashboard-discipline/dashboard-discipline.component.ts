import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-discipline',
  templateUrl: './dashboard-discipline.component.html',
  styleUrls: ['./dashboard-discipline.component.scss']
})
export class DashboardDisciplineComponent implements OnInit {
  cod: string;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cod = params['id'];
    });
  }
}
