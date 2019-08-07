import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SUCCESS, SUCCESS_MESSAGE, ERROR } from '../../enums/constats.enum';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html'
})
export class TransactionsComponent implements OnInit {

  items: any = [];
  open: boolean = false;
  item: Transaction;
  typeEdition: any = {
    type: '',
    title: '',
    result: false,
  };

  constructor(
    private transactionService: TransactionService,
    private toastr: ToastrService
  ) {
    this.getItems();
  }

  ngOnInit() {
  }

  getItems() {
    this.transactionService.getAll().then((resp: any) => {
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

  detail(item: Transaction) {
    this.item = item;
    this.typeEdition.type = 'detail';
    this.typeEdition.title = 'Detalles';
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
