import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Output()
  submitEmit: EventEmitter<any> = new EventEmitter<any>();

  title: string;
  message: string;

  constructor(public bsModalRef: BsModalRef) {}

  submit() {
    this.submitEmit.emit();
  }

  ngOnInit() {

  }
}
