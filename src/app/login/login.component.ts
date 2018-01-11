import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';
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
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'multipart/form-data');
    const formData = new FormData();
    formData.append('username', this.login.value.username);
    formData.append('password', this.login.value.password);
    this.http.post('http://119.29.144.125:8080/cgfeesys/Login', formData, {
      headers: myHeaders
    }).map(res => res.json())
      .subscribe(res => {
        console.log(res);
      });
  }

  ngOnInit() {
  }

}
