import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as Actions from '../../../store/cacheStore.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  login: Observable<any>;
  orgType = '';
  orgLink = '';
  orgInputLink = '';
  orgLevel = ['路公司', '管理处', '收费站'];
  orgLinks = ['roadCompany', '#', 'tollStation'];
  orgInputLinks = ['roadCompanyInput', , 'tollStationInput'];

  constructor(
    private store: Store<any>
  ) {
    this.login = store.select('login');
  }

  ngOnInit() {
    this.login.subscribe(res => {
      this.orgType = this.orgLevel[res.orgType - 1];
      this.orgLink = this.orgLinks[res.orgType - 1];
      this.orgInputLink = this.orgInputLinks[res.orgType - 1];
    });
  }

}
