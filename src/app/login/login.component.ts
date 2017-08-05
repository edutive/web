import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  firstName: string;
  lastName: string;

  loading: boolean = false;
  error: string;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {}

  login() {
    this.loading = true;

    this.authService.login(this.email, this.password, (authUser, error) => {
      if (!error) {
        this.authService.getUser(authUser.uid, user => {
          this.authService.user = user;
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/']);
        });
      } else {
        this.loading = false;
        this.error = error;
      }
    });
  }
}
