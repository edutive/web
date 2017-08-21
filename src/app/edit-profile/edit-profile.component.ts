import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Discipline } from '../discipline/discipline';
import { IconSelectorComponent } from '../add-discipline/icon-selector/icon-selector.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user: any;

  success: string;
  error: string;

  loading: boolean = false;

  constructor(private af: AngularFireDatabase, public authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
      this.user = this.authService.user;
  }

  update(user) {
    this.loading = true;
    this.authService.updateUser(this.user, () => {
      this.router.navigate(['/']);
    });
  }
}