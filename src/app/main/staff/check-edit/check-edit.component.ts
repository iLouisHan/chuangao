import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-edit',
  templateUrl: './check-edit.component.html',
  styleUrls: ['./check-edit.component.scss']
})
export class CheckEditComponent implements OnInit {
  activeIndex: number;
  hasData: boolean;

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
      if (/composit/.test(url)) {
        return 0;
      }else if (/exam/.test(url)) {
        return 1;
      }else if (/star/.test(url)) {
        return 2;
      }else if (/level/.test(url)) {
        return 3;
      }else {
        return 0;
      }
    })(this.router.url);
  }

}
