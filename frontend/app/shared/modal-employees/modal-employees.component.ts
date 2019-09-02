import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Employees } from '../../models/employees.model';
import { ToastrService } from 'ngx-toastr';
import { EmployeesService } from '../../services/employees.service';
import { ProfileService } from '../../services/profile.service';
import { DepartamentService } from '../../services/departament.service';
import { SUCCESS, ERROR, CREATE_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE } from '../../enums/constats.enum';

declare var $: any;

@Component({
  selector: 'app-modal-employees',
  templateUrl: './modal-employees.component.html',
  styleUrls: ['./modal-employees.component.css']
})
export class ModalEmployeesComponent implements OnInit, OnChanges {

  @Input() open: any = false;
  @Input() data: Employees;
  @Input() typeEdition: any;
  @Output('_cancel') _cancel = new EventEmitter();
  @Output('success') success = new EventEmitter();

  itemsProfile: any = [];
  itemsDepartament: any = [];

  constructor(
    private toastr: ToastrService,
    private employessService: EmployeesService,
    private profileService: ProfileService,
    private departamentService: DepartamentService,
  ) {
  }

  ngOnInit() {
    if (this.typeEdition.type == 'new') {
      this.data = new Employees;
      this.profileService.getAll().then(resp => this.itemsProfile = resp);
      this.departamentService.getAll().then(resp => this.itemsDepartament = resp);
    }

    if (this.typeEdition.type == 'edit') {
      this.profileService.getAll().then(resp => this.itemsProfile = resp);
      this.departamentService.getAll().then(resp => this.itemsDepartament = resp);
    }
  }

  ngOnChanges() {
    if (this.open) {
      $('#modalEmployees').modal('show');
    } else {
      $('#modalEmployees').modal('hide');
    }
  }

  accept() {
    if (this.typeEdition.type != 'detail') {
      this.processData();
    } else {
      this.success.emit(true);
      $('#modalEmployees').modal('hide');
    }
  }

  cancel() {
    this._cancel.emit(false);
    $('#modalEmployees').modal('hide');
  }

  processData() {
    switch (this.typeEdition.type) {
      case 'new': {
        this.employessService.postItem(this.data).then(resp => {
          this.showToast();
        }).catch(err => this.showToastError(err.message));
        break;
      }
      case 'edit': {
        this.employessService.updateItem(this.data).then(resp => {
          this.showToast();
        }).catch(err => this.showToastError(err.message));
        break;
      }
      case 'delete': {
        this.employessService.deleteItem(this.data.id).then(resp => {
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
    $('#modalEmployees').modal('hide');
  }

  showToastError(message: string) {
    setTimeout(() => this.toastr.error(message, ERROR));
  }

}
