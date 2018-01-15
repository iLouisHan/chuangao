import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as Actions from '../../../store/cacheStore.actions';
import { Router } from '@angular/router';

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
  orgLinks = ['roadCompany', 'division', 'tollStation'];
  orgInputLinks = ['roadCompanyInput', 'divisionInput', 'tollStationInput'];
  admin: boolean;

  constructor(
    private store: Store<any>,
    private router: Router
  ) {
    this.login = store.select('login');
  }

  testHash(str): boolean {
    return (new RegExp(str)).test(this.router.url);
  }

  ngOnInit() {
    this.login.subscribe(res => {
      this.orgType = this.orgLevel[res.orgType - 1];
      this.orgLink = this.orgLinks[res.orgType - 1];
      this.orgInputLink = this.orgInputLinks[res.orgType - 1];
      this.admin = res.isAdmin;
    });
  }

}
