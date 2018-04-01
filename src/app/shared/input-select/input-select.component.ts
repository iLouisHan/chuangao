import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent implements OnInit, DoCheck {
  @Input()
  staffList: Array<any>;

  @Input()
  set initUser(initUser: string) {
    this.userName = initUser;
  }

  get initUser(): string {
    return this.userName;
  }

  @Output()
  selectUser: EventEmitter<any> = new EventEmitter<any>();

  orgCode: string;
  login: Observable<any> = new Observable<any>();
  listShow = false;
  userName: string;
  staffListShow: Array<any>;

  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.login = store.select('login');
  }

  inputClick() {
    this.listShow = !this.listShow;
  }

  chooseUser(user) {
    this.userName = user.userName;
    this.selectUser.emit(user.userId);
    this.listShow = false;
  }

  inputChange($event) {
    const re = new RegExp($event.target.value);
    this.staffListShow = this.staffList.filter(el => re.test(el.userName));
  }

  ngOnInit() {
    this.staffListShow = this.staffList;
  }

  ngDoCheck() {
    if (this.staffList) {
      this.staffListShow = this.staffList;
    }
  }

}
