import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  @Output()
  confirmEmit: EventEmitter<any> = new EventEmitter();

  @Output()
  cancelEmit: EventEmitter<any> = new EventEmitter();

  title: string;
  message: string;

  constructor(public bsModalRef: BsModalRef) {}

  confirm() {
    this.confirmEmit.emit();
  }

  close() {
    this.cancelEmit.emit();
  }

  ngOnInit() {

  }
}
