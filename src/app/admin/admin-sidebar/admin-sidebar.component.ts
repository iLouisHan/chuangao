import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as Actions from '../../store/cacheStore.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  login: Observable<any>;
  orgType: number;
  orgTypeStr: string;
  orgLink: string;
  orgInputLink: string;
  orgLevel = ['路公司', '管理处', '收费站'];
  orgLinks = ['roadCompany', 'division', 'tollStation'];
  orgInputLinks = ['roadCompanyInput', 'divisionInput', 'tollStationInput'];
  userId: string;

  constructor(
    private store: Store<any>,
    private router: Router
  ) {
    this.login = store.select('login');
  }

  testHash(str): boolean {
    return (new RegExp(str)).test(this.router.url);
  }

  isBasic(): boolean {
    return /(roadCompany|division)/.test(this.router.url);
  }

  ngOnInit() {
    this.login.subscribe(res => {
      this.orgType = res.orgType;
      if (res) {
        this.orgTypeStr = this.orgLevel[res.orgType - 1];
        this.orgLink = this.orgLinks[res.orgType - 1];
        this.orgInputLink = this.orgInputLinks[res.orgType - 1];
      }
    });
  }

}
