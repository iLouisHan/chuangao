import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as Actions from '../../../store/cacheStore.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  login: Observable<any>;

  logout(): void {
    this.store.dispatch(new Actions.SaveLogin(''));
    document.cookie = `login=''`;
    this.router.navigate(['/login']);
  }

  constructor(
    private store: Store<any>,
    private router: Router
  ) {
    this.login = store.select('login');
  }

  ngOnInit() {
  }

}
