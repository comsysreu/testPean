import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Card } from '../../models/card.model';
import { ToastrService } from 'ngx-toastr';
import { CardService } from '../../services/card.service';
import { CustomerService } from '../../services/customer.service';
import { SUCCESS, ERROR, CREATE_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE } from '../../enums/constats.enum';

declare var $: any;

@Component({
  selector: 'app-modal-card',
  templateUrl: './modal-card.component.html',
  styleUrls: ['./modal-card.component.css']
})
export class ModalCardComponent implements OnInit, OnChanges {

  @Input() open: any = false;
  @Input() data: Card;
  @Input() typeEdition: any;
  @Output('_cancel') _cancel = new EventEmitter();
  @Output('success') success = new EventEmitter();

  items: any = [];

  constructor(
    private toastr: ToastrService,
    private cardService: CardService,
    private customerService: CustomerService,
  ) {
  }

  ngOnInit() {
    if (this.typeEdition.type == 'new') {
      this.data = new Card;
    }

    if (this.typeEdition.type == 'new' || this.typeEdition.type == 'edit') {
      this.customerService.getAll().then(resp => this.items = resp);
    }
  }

  ngOnChanges() {
    if (this.open) {
      $('#modalCard').modal('show');
    } else {
      $('#modalCard').modal('hide');
    }
  }

  accept() {
    if (this.typeEdition.type != 'detail') {
      this.processData();
    } else {
      this.success.emit(true);
      $('#modalCard').modal('hide');
    }
  }

  cancel() {
    this._cancel.emit(false);
    $('#modalCard').modal('hide');
  }

  processData() {
    switch (this.typeEdition.type) {
      case 'new': {
        this.cardService.postItem(this.data).then(resp => {
          this.showToast();
        }).catch(err => this.showToastError(err.message));
        break;
      }
      case 'edit': {
        this.cardService.updateItem(this.data).then(resp => {
          this.showToast();
        }).catch(err => this.showToastError(err.message));
        break;
      }
      case 'delete': {
        this.cardService.deleteItem(this.data.id).then(resp => {
          this.showToast();
        }).catch(err => this.showToastError(err.message));
        break;
      }
    }
  }

  showToast(message?: string) {
    switch (this.typeEdition.type) {
      case 'new': {
        setTimeout(() => this.toastr.success(CREATE_MESSAGE, SUCCESS));
        break;
      }
      case 'edit': {
        setTimeout(() => this.toastr.success(UPDATE_MESSAGE, SUCCESS));
        break;
      }
      case 'delete': {
        setTimeout(() => this.toastr.success(DELETE_MESSAGE, SUCCESS));
        break;
      }
    }
    this.success.emit(true);
    $('#modalCard').modal('hide');
  }

  showToastError(message: string) {
    setTimeout(() => this.toastr.error(message, ERROR));
  }

}
