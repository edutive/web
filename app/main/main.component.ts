import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit {

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private alertService: AlertService) { }

  ngOnInit() {}


  

}
