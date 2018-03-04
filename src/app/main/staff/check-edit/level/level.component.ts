import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { work_post } from '../../../../store/translate';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit {
  login: Observable<any> = new Observable<any>();
  orgCode: string;
  levelList: Array<any>;
  hasData: boolean;
  workPost = work_post;
  form: FormGroup;
  staffList: any;
  data: any;

  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.login = store.select('login');
    this.form = new FormGroup({
      userId: new FormControl('', Validators.nullValidator),
      year: new FormControl('', Validators.nullValidator),
      score: new FormControl('', Validators.nullValidator)
    });
  }

  add() {

  }

  getInfo() {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/Check/getCheckSkill?userId=${this.form.value.userId}`)
      .map(res => res.json())
      .subscribe(res => {
        if (res.code) {
          console.log(res);
        }else {
          alert(res.message);
        }
      });
  }

  getStaff() {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/BaseInfo/getStationUserId?stationCode=${this.orgCode}`)
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.staffList = res.data;
              }else {
                alert(res.message);
              }
            });
  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res) {
        this.orgCode = res.orgCode;
        this.getStaff();
      }
    });
  }

}
