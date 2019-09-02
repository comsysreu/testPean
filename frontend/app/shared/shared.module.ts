import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ModalUserComponent } from './modal-user/modal-user.component';
import { ModalStoreComponent } from './modal-store/modal-store.component';
import { ModalCustomerComponent } from './modal-customer/modal-customer.component';
import { ModalCardComponent } from './modal-card/modal-card.component';
import { ModalTransactionComponent } from './modal-transaction/modal-transaction.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeBodyComponent } from './home-body/home-body.component';
import { NavBarHomeComponent } from './nav-bar-home/nav-bar-home.component';
import { PromotionsBodyComponent } from './promotions-body/promotions-body.component';
import { ContactUsBodyComponent } from './contact-us-body/contact-us-body.component';
import { ModalProfileComponent } from './modal-profile/modal-profile.component';
import { ModalDepartamentComponent } from './modal-departament/modal-departament.component';
import { ModalEmployeesComponent } from './modal-employees/modal-employees.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule
  ],
  declarations: [
    NotFoundComponent,
    ModalUserComponent,
    ModalStoreComponent,
    ModalCustomerComponent,
    ModalCardComponent,
    ModalTransactionComponent,
    HeaderComponent,
    FooterComponent,
    HomeBodyComponent,
    NavBarHomeComponent,
    PromotionsBodyComponent,
    ContactUsBodyComponent,
    ModalProfileComponent,
    ModalDepartamentComponent,
    ModalEmployeesComponent
  ],
  exports: [
    NotFoundComponent,
    ModalUserComponent,
    ModalStoreComponent,
    ModalCustomerComponent,
    ModalCardComponent,
    ModalTransactionComponent,
    HeaderComponent,
    FooterComponent,
    HomeBodyComponent,
    NavBarHomeComponent,
    PromotionsBodyComponent, 
    ContactUsBodyComponent, 
    ModalProfileComponent,
    ModalDepartamentComponent,
    ModalEmployeesComponent
  ]
})
export class SharedModule { }
