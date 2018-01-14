import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-road-company-input',
  templateUrl: './road-company-input.component.html',
  styleUrls: ['./road-company-input.component.scss']
})
export class RoadCompanyInputComponent implements OnInit {
  activeIndex: number;

  constructor(
    private router: Router
  ) { }

  tab(val) {
    this.activeIndex = val;
  }

  iftab(val) {
    return this.activeIndex === val;
  }

  ngOnInit() {
    this.activeIndex = /images/.test(this.router.url) ? 1 : 0;
  }

}
