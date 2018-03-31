import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  options1: any;
  options2: any;
  options3: any;
  options4: any;
  updateOptions1: any;
  updateOptions2: any;
  updateOptions3: any;
  updateOptions4: any;

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
