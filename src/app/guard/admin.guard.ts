import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Injectable()
export class AdminGuard implements CanActivate {
  login: Observable<any>;
  admin: boolean;
  userId: string;
  orgType: number;

  constructor(
    private router: Router,
    private store: Store<any>
  ) {
    this.login = store.select('login');
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.login.subscribe(res => {
        this.admin = res.isAdmin;
        this.userId = res.userId;
        this.orgType = res.orgType;
      });
      // if (this.orgType === 1 || this.orgType === 2) {
      if (this.admin) {
        return true;
      }else {
        return false;
      }
  }
}
