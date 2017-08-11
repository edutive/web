import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Discipline } from '../discipline/discipline';

@Component({
  selector: 'app-edit-discipline',
  templateUrl: './edit-discipline.component.html',
  styleUrls: ['./edit-discipline.component.scss']
})
export class EditDisciplineComponent implements OnInit {
  loading: boolean = false;
  discipline: Discipline;

  success: string;
  error: string;

  constructor(private af: AngularFireDatabase, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.af.object('/subjects/' + params['id']).subscribe(subject => {
        this.discipline = subject;
      });
    });
  }

  editDiscipline() {
    this.af
      .object('/subjects/' + this.discipline.id)
      .update(this.discipline)
      .then(() => {
        this.success = 'Disciplina atualizada com sucesso.';
      })
      .catch(() => {
        this.error = 'Houve um error ao atualizar a disciplina.';
      });
  }
}
