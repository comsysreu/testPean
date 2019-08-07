import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { Card } from '../../models/card.model';
import { ToastrService } from 'ngx-toastr';
import { CardService } from '../../services/card.service';
import { UserService } from '../../services/user.service';
import { StoreService } from '../../services/store.service';
import { TransactionService } from '../../services/transaction.service';
import { SUCCESS, ERROR, CREATE_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE } from '../../enums/constats.enum';

declare var $: any;

@Component({
  selector: 'app-modal-transaction',
  templateUrl: './modal-transaction.component.html',
  styleUrls: ['./modal-transaction.component.css']
})
export class ModalTransactionComponent implements OnInit, OnChanges {

  @Input() open: any = false;
  @Input() data: Transaction;
  @Input() typeEdition: any;
  @Output('_cancel') _cancel = new EventEmitter();
  @Output('success') success = new EventEmitter();

  itemsCard: any = [];
  itemsUser: any = [];
  itemsStore: any = [];

  selectedCard: Card;

  constructor(
    private toastr: ToastrService,
    private cardService: CardService,
    private userService: UserService,
    private storeService: StoreService,
    private transactionService: TransactionService
  ) {
  }

  ngOnInit() {
    if (this.typeEdition.type == 'new') {
      this.data = new Transaction;
    }

    if (this.typeEdition.type == 'new') {
      this.cardService.getAll().then(resp => this.itemsCard = resp);
      this.userService.getAll().then(resp => this.itemsUser = resp);
      this.storeService.getAll().then(resp => this.itemsStore = resp);
    }
    
    if (this.typeEdition.type == 'detail') {
      this.cardService.getById(this.data.card.id).then((resp: any) => {
        this.data.card = resp;
      });
    }
  }

  ngOnChanges() {
    if (this.open) {
      $('#modalTransaction').modal('show');
    } else {
      $('#modalTransaction').modal('hide');
    }
  }

  accept() {
    if (this.typeEdition.type != 'detail') {
      this.processData();
    } else {
      this.success.emit(true);
      $('#modalTransaction').modal('hide');
    }
  }

  cancel() {
    this._cancel.emit(false);
    $('#modalTransaction').modal('hide');
  }

  processData() {
    switch (this.typeEdition.type) {
      case 'new': {
        this.transactionService.postItem(this.data).then(resp => {
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
    }
    this.success.emit(true);
    $('#modalTransaction').modal('hide');
  }

  showToastError(message: string) {
    setTimeout(() => this.toastr.error(message, ERROR));
  }

  cardData(evt) {
    this.selectedCard = this.itemsCard.find(element => this.data.card == element.id);
    this.data.sale = 0;
    this.data.total = 0;
  }

  calculateData(evt) {
    if (this.selectedCard) {
      if (this.selectedCard.balance > this.data.sale) {
        if (this.selectedCard.customer.age < 16 || this.selectedCard.customer.age > 65) {
          this.data.total = this.data.sale * 0.85;
          this.data.discount_rate = 15;
          this.data.discount_sale = this.data.sale * 0.15;
        } else {
          this.data.total = this.data.sale;
          this.data.discount_rate = 0;
          this.data.discount_sale = 0;
        }
      } else {
        this.data.sale = 0;
        this.data.total = 0;
        this.data.discount_rate = 0;
        this.data.discount_sale = 0;
        this.showToastError('Monto de compra supera el saldo de la tarjeta');
      }
    } else {
      this.showToastError('Debe seleccionar primero la tarjeta');
    }
  }

}
