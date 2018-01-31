import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class GeneralGuard implements CanActivate {
  login: Observable<any>;
  admin: boolean;
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
        this.orgType = res.orgType;
      });
      if (this.orgType === 3 && !this.admin) {
        return true;
      }else {
        return false;
      }
  }
}

