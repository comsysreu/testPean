import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../services/customer.service';
import { SUCCESS, ERROR, CREATE_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE } from '../../enums/constats.enum';

declare var $: any;

@Component({
  selector: 'app-modal-customer',
  templateUrl: './modal-customer.component.html',
  styleUrls: ['./modal-customer.component.css']
})
export class ModalCustomerComponent implements OnInit, OnChanges {

  @Input() open: any = false;
  @Input() data: Customer;
  @Input() typeEdition: any;
  @Output('_cancel') _cancel = new EventEmitter();
  @Output('success') success = new EventEmitter();

  passwordConfirm: string = '';

  constructor(
    private toastr: ToastrService,
    private customerService: CustomerService,
  ) {
  }

  ngOnInit() {
    if (this.typeEdition.type == 'new') {
      this.data = new Customer;
    }
  }

  ngOnChanges() {
    if (this.open) {
      $('#modalCustomer').modal('show');
    } else {
      $('#modalCustomer').modal('hide');
    }
  }

  accept() {
    if (this.typeEdition.type != 'detail') {
      this.processData();
    } else {
      this.success.emit(true);
      $('#modalCustomer').modal('hide');
    }
  }

  cancel() {
    this._cancel.emit(false);
    $('#modalCustomer').modal('hide');
  }

  processData() {
    switch (this.typeEdition.type) {
      case 'new': {
        this.customerService.postItem(this.data).then(resp => {
          this.showToast();
        }).catch(err => this.showToastError(err.message));
        break;
      }
      case 'edit': {
        this.customerService.updateItem(this.data).then(resp => {
          this.showToast();
        }).catch(err => this.showToastError(err.message));
        break;
      }
      case 'delete': {
        this.customerService.deleteItem(this.data.id).then(resp => {
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
    $('#modalCustomer').modal('hide');
  }

  showToastError(message: string) {
    setTimeout(() => this.toastr.error(message, ERROR));
  }

}
