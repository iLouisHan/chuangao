import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

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

  constructor(
    private http: Http
  ) { }

  onSubmit() {
    // const myHeaders: Headers = new Headers();
    // myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    // const formData = new FormData();
    // const _body = `username=${this.login.value.username}&password=${this.login.value.password}`;
    // const data = new URLSearchParams();
    // data.append('username', this.login.value.username);
    // data.append('password', this.login.value.password);
    // console.log(_body);
    // formData.append('body', _body);
    // this.http.post('http://119.29.144.125:8080/cgfeesys/Login', data, {
    //   headers: myHeaders
    // }).map(res => res.json())
    //   .subscribe(res => {
    //     console.log(res);
    //   });
    this.http.get(`http://119.29.144.125:8080/cgfeesys/Login?username=${this.login.value.username}&password=${this.login.value.password}`)
            .map(res => res.json())
            .subscribe(res => {
              console.log(res);
            });
  }

  ngOnInit() {
  }

}
