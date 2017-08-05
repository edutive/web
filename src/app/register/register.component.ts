import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  firstname: string;
  lastname: string;

  loading: boolean = false;

  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  signup() {
    this.loading = true;

    this.authService.signup(this.email, this.password, (authUser, error) => {
      if (!error) {
        const user = {
          uid: authUser.uid,
          email: this.email,
          firstname: this.firstname,
          lastname: this.lastname
        };

        this.authService.insert(user, (databaseUser, errorInsert) => {
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
