import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as Actions from '../../store/cacheStore.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  login: Observable<any>;
  role = '';
  orgLevel = ['超级', '路公司', '管理处', '收费站'];
  noteData: any = {};
  noteCount = 0;

  logout(): void {
    this.store.dispatch(new Actions.SaveLogin(''));
    document.cookie = `login=`;
    this.router.navigate(['/login']);
  }

  constructor(
    private http: Http,
    private store: Store<any>,
    private router: Router
  ) {
    this.login = store.select('login');
  }

  
  getNotification(orgCode, orgType) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/BaseInfo/getNotification?orgCode=${orgCode}&orgType=${orgType}`)
    .map(res => res.json())
    .subscribe(res => {
      if (res.code) {
        this.noteData = res.data;
        if(this.noteData){
          this.noteCount = (this.noteData.shiftChangeCount || 0) + 
          (this.noteData.returnCount || 0) +
          (this.noteData.replaceCount || 0) +
          (this.noteData.leaveCount || 0);
        }
              }else {
                alert(res.message);
              }
            });
  }

  showNoteDetail(){
    console.log('showNoteDetail');
  }
  
  hideNoteDetail(){
    console.log('hideNoteDetail');
  }

  ngOnInit() {
    this.login.subscribe(res => {
      if (res) {
        console.log('res ： ', res);
        this.role = `${this.orgLevel[res.orgType]}${res.isAdmin ? '管理员' : '普通'}账号`;
        this.getNotification(res.orgCode, res.orgType);
      }
    });
  }

}
