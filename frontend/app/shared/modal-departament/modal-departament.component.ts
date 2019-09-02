import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Departament } from '../../models/departament.model';
import { ToastrService } from 'ngx-toastr';
import { DepartamentService } from '../../services/departament.service';
import { SUCCESS, ERROR, CREATE_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE } from '../../enums/constats.enum';

declare var $: any;

@Component({
  selector: 'app-modal-departament',
  templateUrl: './modal-departament.component.html',
  styleUrls: ['./modal-departament.component.css']
})
export class ModalDepartamentComponent implements OnInit, OnChanges {

  @Input() open: any = false;
  @Input() data: Departament;
  @Input() typeEdition: any;
  @Output('_cancel') _cancel = new EventEmitter();
  @Output('success') success = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private departamentService: DepartamentService,
  ) {
  }

  ngOnInit() {
    if (this.typeEdition.type == 'new') {
      this.data = new Departament;
    }
  }

  ngOnChanges() {
    if (this.open) {
      $('#modalDepartament').modal('show');
    } else {
      $('#modalDepartament').modal('hide');
    }
  }

  accept() {
    if (this.typeEdition.type != 'detail') {
      this.processData();
    } else {
      this.success.emit(true);
      $('#modalDepartament').modal('hide');
    }
  }

  cancel() {
    this._cancel.emit(false);
    $('#modalDepartament').modal('hide');
  }

  processData() {
    switch (this.typeEdition.type) {
      case 'new': {
        this.departamentService.postItem(this.data).then(resp => {
          this.showToast();
        }).catch(err => this.showToastError(err.message));
        break;
      }
      case 'edit': {
        this.departamentService.updateItem(this.data).then(resp => {
          this.showToast();
        }).catch(err => this.showToastError(err.message));
        break;
      }
      case 'delete': {
        this.departamentService.deleteItem(this.data.id).then(resp => {
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
    $('#modalDepartament').modal('hide');
  }

  showToastError(message: string) {
    setTimeout(() => this.toastr.error(message, ERROR));
  }

}
