import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-cloth-choose',
  templateUrl: './cloth-choose.component.html',
  styleUrls: ['./cloth-choose.component.scss']
})
export class ClothChooseComponent implements OnInit {

  @Output()
  chosenCloth: EventEmitter<any> = new EventEmitter<any>();

  clothList = [];
  switchTableShow = false;
  _cloth: string;
  clothesTypeList = {
    1: '冬装',
    2: '春装',
    3: '头花',
    4: '春秋装',
  };
  clothesClassificationList = {
    1: '管理（执法）类服装',
    2: '收费类服装'
  };

  constructor(
    private http: Http
  ) {

  }

  chooseCloth($event) {
    this._cloth = this.clothesTypeList[$event.clothesType];
    this.chosenCloth.emit($event);
  }

  getInfo() {
    this.http.get('http://119.29.144.125:8080/cgfeesys/Clothes/getClothesInfo')
        .map(res => res.json())
        .subscribe(res => {
          this.clothList = res.data;
        });
  }

  toggle() {
    this.switchTableShow = !this.switchTableShow;
  }

  ngOnInit() {
    this.getInfo();
  }

}
