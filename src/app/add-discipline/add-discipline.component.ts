import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { IconSelectorComponent } from './icon-selector/icon-selector.component';

@Component({
  selector: 'app-add-discipline',
  templateUrl: './add-discipline.component.html',
  styleUrls: ['./add-discipline.component.scss']
})
export class AddDisciplineComponent implements OnInit {
  name: string;
  id: any;
  uid: any;

  loading: boolean = false;
  openIcons: boolean = false;

  error: string;

  @ViewChild('icon') icon: IconSelectorComponent;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  addDiscipline() {
    this.loading = true;

    this.uid = this.authService.user.uid;

    const ref = firebase.database().ref('subjects').push();

    this.id = ref.key;

    ref
      .set({
        icon: this.icon.selected,
        id: this.id,
        name: this.name,
        user: this.uid,
        status: 'current'
      })
      .then(value => {
        this.router.navigate(['/']);
      });
  }

  onClickOutside(event: Object) {
    if (event && event['value'] === true) {
      this.openIcons = false;
    }
  }
}
