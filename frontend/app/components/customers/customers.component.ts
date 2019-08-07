import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SUCCESS, SUCCESS_MESSAGE, ERROR } from '../../enums/constats.enum';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {

  items: any = [];
  open: boolean = false;
  item: Customer;
  typeEdition: any = {
    type: '',
    title: '',
    result: false,
  };

  constructor(
    private customerService: CustomerService,
    private toastr: ToastrService
  ) {
    this.getItems();
  }

  ngOnInit() {
  }

  getItems() {
    this.customerService.getAll().then((resp: any) => {
      if (resp.response) {
        this.showToast('error', resp.response);
      } else {
        this.items = resp;
        this.showToast('success');
      }
    }).catch(err => {
      this.showToast('error', err.message);
    })
  }

  add() {
    this.typeEdition.type = 'new';
    this.typeEdition.title = 'Agregar Registro';
    this.typeEdition.result = false;
    this.open = true;
  }

  detail(item: Customer) {
    this.item = item;
    this.typeEdition.type = 'detail';
    this.typeEdition.title = 'Detalles';
    this.typeEdition.result = false;
    this.open = true;
  }

  edit(item: Customer) {
    this.item = item;
    this.typeEdition.type = 'edit';
    this.typeEdition.title = 'Editar Registro';
    this.typeEdition.result = false;
    this.open = true;
  }

  delete(item: Customer) {
    this.item = item;
    this.typeEdition.type = 'delete';
    this.typeEdition.title = 'Eliminar Registro';
    this.typeEdition.result = false;
    this.open = true;
  }

  showToast(type: string, message?: string) {
    switch (type) {
      case 'success': {
        setTimeout(() => this.toastr.success(SUCCESS_MESSAGE, SUCCESS));
        break;
      }
      case 'error': {
        setTimeout(() => this.toastr.success(message, ERROR));
        break;
      }
    }
  }

  successModal(evt) {
    this.open = false;
    this.getItems();
  }

}
