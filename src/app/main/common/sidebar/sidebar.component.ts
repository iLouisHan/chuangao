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

  constructor(
    private store: Store<any>
  ) {
    this.login = store.select('login');
  }

  ngOnInit() {
    this.login.subscribe(res => {
      console.log(res);
    });
    this.store.dispatch(new Actions.SaveLogin({a: 123}));
  }

}
