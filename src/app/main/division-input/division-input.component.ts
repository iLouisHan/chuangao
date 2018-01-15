import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-division-input',
  templateUrl: './division-input.component.html',
  styleUrls: ['./division-input.component.scss']
})
export class DivisionInputComponent implements OnInit {
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
