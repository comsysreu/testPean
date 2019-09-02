import { ToastrService } from 'ngx-toastr';
import { Departament } from '../../models/departament.model';
import { Component, OnInit } from '@angular/core';
import { DepartamentService } from '../../services/departament.service';
import { SUCCESS, SUCCESS_MESSAGE, ERROR } from '../../enums/constats.enum';

@Component({
  selector: 'app-departament',
  templateUrl: './departament.component.html',
  styleUrls: ['../contact-us-admin/contact-us-admin.component.css']
})
export class DepartamentComponent implements OnInit {

  items: any = [];
  open: boolean = false;
  item: Departament;
  typeEdition: any = {
    type: '',
    title: '',
    result: false,
  };

  constructor(
    private departamentService: DepartamentService,
    private toastr: ToastrService
  ) {
    this.getItems();
  }

  ngOnInit() {
  }

  getItems() {
    this.departamentService.getAll().then((resp: any) => {
      if (resp.response) {
        this.showToast('error', resp.response);
      } else {
        this.items = resp;
        this.showToast('success');
      }
    }).catch(err => {
      this.showToast('error', err.response);
    })
  }

  add() {
    this.typeEdition.type = 'new';
    this.typeEdition.title = 'Agregar Registro';
    this.typeEdition.result = false;
    this.open = true;
  }

  detail(item: Departament) {
    this.item = item;
    this.typeEdition.type = 'detail';
    this.typeEdition.title = 'Detalles';
    this.typeEdition.result = false;
    this.open = true;
  }

  edit(item: Departament) {
    this.item = item;
    this.typeEdition.type = 'edit';
    this.typeEdition.title = 'Editar Registro';
    this.typeEdition.result = false;
    this.open = true;
  }

  delete(item: Departament) {
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
