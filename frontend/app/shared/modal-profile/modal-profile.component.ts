import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Profile } from '../../models/profile.model';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../services/profile.service';
import { SUCCESS, ERROR, CREATE_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE } from '../../enums/constats.enum';

declare var $: any;

@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: ['./modal-profile.component.css']
})
export class ModalProfileComponent implements OnInit, OnChanges {

  @Input() open: any = false;
  @Input() data: Profile;
  @Input() typeEdition: any;
  @Output('_cancel') _cancel = new EventEmitter();
  @Output('success') success = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private profileService: ProfileService,
  ) {
  }

  ngOnInit() {
    if (this.typeEdition.type == 'new') {
      this.data = new Profile;
    }
  }

  ngOnChanges() {
    if (this.open) {
      $('#modalProfile').modal('show');
    } else {
      $('#modalProfile').modal('hide');
    }
  }

  accept() {
    if (this.typeEdition.type != 'detail') {
      this.processData();
    } else {
      this.success.emit(true);
      $('#modalProfile').modal('hide');
    }
  }

  cancel() {
    this._cancel.emit(false);
    $('#modalProfile').modal('hide');
  }

  processData() {
    switch (this.typeEdition.type) {
      case 'new': {
        this.profileService.postItem(this.data).then(resp => {
          this.showToast();
        }).catch(err => this.showToastError(err.message));
        break;
      }
      case 'edit': {
        this.profileService.updateItem(this.data).then(resp => {
          this.showToast();
        }).catch(err => this.showToastError(err.message));
        break;
      }
      case 'delete': {
        this.profileService.deleteItem(this.data.id).then(resp => {
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
    $('#modalProfile').modal('hide');
  }

  showToastError(message: string) {
    setTimeout(() => this.toastr.error(message, ERROR));
  }

}
