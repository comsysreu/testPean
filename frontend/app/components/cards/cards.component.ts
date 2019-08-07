import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SUCCESS, SUCCESS_MESSAGE, ERROR } from '../../enums/constats.enum';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html'
})
export class CardsComponent implements OnInit {

  items: any = [];
  open: boolean = false;
  item: Card;
  typeEdition: any = {
    type: '',
    title: '',
    result: false,
  };

  constructor(
    private cardService: CardService,
    private toastr: ToastrService
  ) {
    this.getItems();
  }

  ngOnInit() {
  }

  getItems() {
    this.cardService.getAll().then((resp: any) => {
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

  detail(item: Card) {
    this.item = item;
    this.typeEdition.type = 'detail';
    this.typeEdition.title = 'Detalles';
    this.typeEdition.result = false;
    this.open = true;
  }

  edit(item: Card) {
    this.item = item;
    this.typeEdition.type = 'edit';
    this.typeEdition.title = 'Editar Registro';
    this.typeEdition.result = false;
    this.open = true;
  }

  delete(item: Card) {
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
