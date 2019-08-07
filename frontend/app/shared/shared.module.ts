import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { ModalUserComponent } from './modal-user/modal-user.component';
import { ModalStoreComponent } from './modal-store/modal-store.component';
import { ModalCustomerComponent } from './modal-customer/modal-customer.component';
import { ModalCardComponent } from './modal-card/modal-card.component';
import { ModalTransactionComponent } from './modal-transaction/modal-transaction.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    NotFoundComponent,
    ModalUserComponent,
    ModalStoreComponent,
    ModalCustomerComponent,
    ModalCardComponent,
    ModalTransactionComponent
  ],
  exports: [
    NotFoundComponent,
    ModalUserComponent,
    ModalStoreComponent,
    ModalCustomerComponent, 
    ModalCardComponent,
    ModalTransactionComponent
  ]
})
export class SharedModule { }
