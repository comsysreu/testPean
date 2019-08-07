import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Store } from '../../models/store.model';
import { ToastrService } from 'ngx-toastr';
import { StoreService } from '../../services/store.service';
import { SUCCESS, ERROR, CREATE_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE } from '../../enums/constats.enum';

declare var $: any;

@Component({
  selector: 'app-modal-store',
  templateUrl: './modal-store.component.html',
  styleUrls: ['./modal-store.component.css']
})
export class ModalStoreComponent implements OnInit, OnChanges {

  @Input() open: any = false;
  @Input() data: Store;
  @Input() typeEdition: any;
  @Output('_cancel') _cancel = new EventEmitter();
  @Output('success') success = new EventEmitter();

  passwordConfirm: string = '';

  constructor(
    private toastr: ToastrService,
    private storeService: StoreService,
  ) {
  }

  ngOnInit() {
    if (this.typeEdition.type == 'new') {
      this.data = new Store;
    }
  }

  ngOnChanges() {
    if (this.open) {
      $('#modalStore').modal('show');
    } else {
      $('#modalStore').modal('hide');
    }
  }

  accept() {
    if (this.typeEdition.type != 'detail') {
      this.processData();
    } else {
      this.success.emit(true);
      $('#modalStore').modal('hide');
    }
  }

  cancel() {
    this._cancel.emit(false);
    $('#modalStore').modal('hide');
  }

  processData() {
    switch (this.typeEdition.type) {
      case 'new': {
        this.storeService.postItem(this.data).then(resp => {
          this.showToast();
        }).catch(err => this.showToastError(err.message));
        break;
      }
      case 'edit': {
        this.storeService.updateItem(this.data).then(resp => {
          this.showToast();
        }).catch(err => this.showToastError(err.message));
        break;
      }
      case 'delete': {
        this.storeService.deleteItem(this.data.id).then(resp => {
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
    $('#modalStore').modal('hide');
  }

  showToastError(message: string) {
    setTimeout(() => this.toastr.error(message, ERROR));
  }

}
