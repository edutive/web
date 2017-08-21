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
    this.id = this.generateUniqueID();

    firebase
      .database()
      .ref('subjects/' + this.id)
      .set({
        icon: this.icon.selected,
        id: this.id,
        name: this.name,
        user: this.uid,
        status: 'current',
        quizes: 0,
        training: 0,
        forum: 0,
        students: 0
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

  generateUniqueID() {
    const numbers = '0123456789';
    const chars = 'acdefhiklmnoqrstuvwxyz';

    let string_length = 3;
    let randomstring = '';
    let randomstring2 = '';

    for (let x = 0; x < string_length; x++) {
      let letterOrNumber = Math.floor(Math.random() * 2);
      let rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }

    for (let y = 0; y < string_length; y++) {
      let letterOrNumber2 = Math.floor(Math.random() * 2);
      let rnum2 = Math.floor(Math.random() * numbers.length);
      randomstring2 += numbers.substring(rnum2, rnum2 + 1);
    }

    function shuffle(o) {
      for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    }

    let code = shuffle((randomstring + randomstring2).split('')).join('');
    return code;
  }
}
