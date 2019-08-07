import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { User } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { SUCCESS, ERROR, CREATE_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE } from '../../enums/constats.enum';

declare var $: any;

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit, OnChanges {

  @Input() open: any = false;
  @Input() data: User;
  @Input() typeEdition: any;
  @Output('_cancel') _cancel = new EventEmitter();
  @Output('success') success = new EventEmitter();

  passwordConfirm: string = '';

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    if (this.typeEdition.type == 'new') {
      this.data = new User;
      this.data.position = 'Seleccionar perfil';
    }
  }

  ngOnChanges() {
    if (this.open) {
      $('#modalUser').modal('show');
    } else {
      $('#modalUser').modal('hide');
    }
  }

  accept() {
    if(this.typeEdition.type != 'detail') {
      if (this.data.password != this.passwordConfirm && this.typeEdition.type != 'delete') {
        setTimeout(() => this.toastr.error('Contraseñas distintas', 'Error!'));
      } else {
        this.processData();
      }
    } else {
      this.success.emit(true);
      $('#modalUser').modal('hide');
    }
  }

  cancel() {
    this._cancel.emit(false);
    $('#modalUser').modal('hide');
  }

  processData() {
    switch (this.typeEdition.type) {
      case 'new': {
        this.userService.postUser(this.data).then(resp => {
          this.showToast();
        }).catch(err => this.showToastError(err.message));
        break;
      }
      case 'edit': {
        this.userService.updateUser(this.data).then(resp => {
          this.showToast();
        }).catch(err => this.showToastError(err.message));
        break;
      }
      case 'delete': {
        this.userService.deleteUser(this.data.id).then(resp => {
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
    $('#modalUser').modal('hide');
  }

  showToastError(message: string) {
    setTimeout(() => this.toastr.error(message, ERROR));
  }

}
