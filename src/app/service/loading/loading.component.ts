import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @ViewChild('element', {read: ViewContainerRef}) public element: ViewContainerRef;

  constructor() { }

  removeLoading() {
    this.element.clear();
  }

  ngOnInit() {
  }

}
