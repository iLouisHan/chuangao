import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { work_post } from '../../store/translate';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss']
})
export class StaffDetailComponent implements OnInit {
  staffId: string;
  data: any = {};
  educational = ['研究生', '本科', '专科', '中专', '高中'];
  work_post = work_post;
  now_date = new Date();

  constructor(
    private route: ActivatedRoute,
    private http: Http,
    private router: Router
  ) {
    this.staffId = this.route.snapshot.queryParams['id'];
  }

  age(val) {
    return this.now_date.getFullYear() - (new Date(val)).getFullYear() || 0;
  }

  getInfo(staffId) {
    this.http.get(`http://119.29.144.125:8080/cgfeesys/User/getUserDetail?userId=${staffId}`)
            .map(res => res.json())
            .subscribe(res => {
              if (res.code) {
                this.data = res.data;
              }else {
                alert(res.message);
              }
            });
  }

  ngOnInit() {
    if (this.staffId) {
      this.getInfo(this.staffId);
    }else {
      this.router.navigate(['main/home']);
    }
  }

}
