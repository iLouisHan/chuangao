import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class TollGuard implements CanActivate {
  login: Observable<any>;
  toll: boolean;

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
        if (res.orgType === 3) {
          this.toll = true;
        }else {
          this.toll = false;
        }
      });
      if (this.toll) {
        this.router.navigate(['/main/tollStation']);
        return false;
      }else {
        return true;
      }
  }
}
