import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-dashboard-discipline',
  templateUrl: './dashboard-discipline.component.html',
  styleUrls: ['./dashboard-discipline.component.scss']
})
export class DashboardDisciplineComponent implements OnInit {
  cod: string;

  data: any[] = [];

  totalStudents = 0;

  multi: any[] = [];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Assuntos';
  showYAxisLabel = true;
  yAxisLabel = 'Questões';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor(private af: AngularFireDatabase, private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cod = params['id'];
    });

    let data = {};

    this.af.list('students').subscribe(snapshot => {
      snapshot.forEach(user => {
        if (user[this.cod]) {
          this.totalStudents++;
        }
      });
    });

    let newD = {};

    firebase.database().ref('results').on('value', snapshop => {
      Object.keys(snapshop.val()).forEach(results => {
        const result = snapshop.val()[results];

        Object.keys(result).forEach(quizes => {
          if (result[quizes][0].subject === this.cod) {
            console.log(result[quizes], result[quizes][0].quiz);
            if (!newD[result[quizes][0].quiz]) {
              newD[result[quizes][0].quiz] = 0;
            }

            newD[result[quizes][0].quiz]++;
          }

          result[quizes].forEach(question => {
            if (question.subject === this.cod) {
              if (!data[question.content]) {
                data[question.content] = {
                  right: 0,
                  wrong: 0
                };
              }

              if (question.correct) {
                data[question.content].right++;
              } else {
                data[question.content].wrong++;
              }
            }
          });
        });
      });

      console.log(newD);

      Object.keys(newD).forEach(key => {
        this.data.push({
          name: key,
          value: newD[key]
        });
      });

      Object.keys(data).forEach(key => {
        this.multi.push({
          name: key,
          series: [
            {
              name: 'Acertos',
              value: data[key].right
            },
            {
              name: 'Erros',
              value: data[key].wrong
            }
          ]
        });
      });

      console.log(this.multi);
    });
  }

  onSelect(event) {
    console.log(event);
  }
}
