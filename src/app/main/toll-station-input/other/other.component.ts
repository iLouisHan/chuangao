import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {
  login: Observable<any>;
  form: FormGroup;
  keys: Array<string>;
  data: any;

  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.login = store.select('login');
    this.form = new FormGroup({
      stationIntroduce: new FormControl('', Validators.nullValidator),
      stationHorstoryHonor: new FormControl('', Validators.nullValidator),
      stationEventHistory: new FormControl('', Validators.nullValidator)
    });
    this.keys = Object.keys(this.form.value);
  }

  getInfo(orgCode) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/BaseInfo/getStationInfo?stationCode=${orgCode}`)
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.data = res.data;
                this.form.patchValue(res.data);
              }else {
                alert(res.message);
              }
            });
  }

  submit() {
    // const spaceArr = this.keys.filter(el => !this.form.value[el]).map(el => this.trans[el]);
    // if (spaceArr.length > 0) {
    //   alert(`${spaceArr.join(',')}为空`);
    // }else {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.keys.forEach(el => {
      this.data[el] = this.form.value[el];
    });
    this.http.post('http://119.29.144.125:8080/cgfeesys/BaseInfo/setDefaultStation', JSON.stringify(this.data), {
      headers: myHeaders
    }).map(res => res.json())
      .subscribe(res => {
        alert(res.message);
      });
    // }
  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res && res.orgType === 3) {
        this.getInfo(res.orgCode);
      }
    });
    window.scrollTo(0, 0);
  }
}
