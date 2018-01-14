import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import * as Actions from '../store/cacheStore.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  getCookie(): void {
    const cookie = document.cookie.split(';');
    const result = cookie.filter(el => el.trim().length > 0).map(el => el.trim().split('=')).filter(el => el[0] === 'login');
    if (result.length > 0) {
      const res = result[0];
      if (/\"\w+\"/.test(res[1])) {
        this.store.dispatch(new Actions.SaveLogin(JSON.parse(res[1])));
        this.router.navigate(['/main']);
      }
    }
  }

  constructor(
    private http: Http,
    private store: Store<any>,
    private router: Router
  ) {}

  onSubmit() {
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    this.http.post('http://119.29.144.125:8080/cgfeesys/Login',
      JSON.stringify({
        username: this.login.value.username,
        password: this.login.value.password
      }), {
      headers: myHeaders
    }).map(res => res.json())
      .subscribe(res => {
        if (res.code) {
          this.store.dispatch(new Actions.SaveLogin(res.data));
          this.router.navigate(['/main']);
          document.cookie = `login=${JSON.stringify(res.data)}`;
        }else {
          alert(res.message);
        }
      });
  }

  ngOnInit() {
    this.getCookie();
  }

}
