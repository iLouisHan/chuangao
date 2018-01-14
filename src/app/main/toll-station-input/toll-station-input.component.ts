import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toll-station-input',
  templateUrl: './toll-station-input.component.html',
  styleUrls: ['./toll-station-input.component.scss']
})
export class TollStationInputComponent implements OnInit {
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
    this.activeIndex = (function(url){
      if (/basic/.test(url)) {
        return 0;
      }else if (/contact/.test(url)) {
        return 1;
      }else if (/line/.test(url)) {
        return 2;
      }else if (/other/.test(url)) {
        return 3;
      }else if (/images/.test(url)) {
        return 4;
      }else {
        return 0;
      }
    })(this.router.url);
  }

}
