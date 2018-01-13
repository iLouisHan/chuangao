import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class HasLoginGuard implements CanActivate {
  login: Observable<any>;
  hasLogin = false;

  constructor(
    private router: Router,
    private store: Store<any>
  ) {
    this.login = store.select('login');
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.login.subscribe(res => {
      if (res) {
        this.hasLogin = true;
      }else {
        this.hasLogin = false;
      }
    });
    if (state.url !== '/login') {
      if (this.hasLogin) {
        return true;
      }else {
        this.router.navigate(['/login']);
        return false;
      }
    }else {
      if (this.hasLogin) {
        this.router.navigate(['/main']);
        return false;
      }else {
        return true;
      }
    }
  }
}
