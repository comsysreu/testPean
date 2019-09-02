import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentRoutingModule } from './componets-routing.module';
import { UserComponent } from './user/user.component';
import { SharedModule } from '../shared/shared.module';
import { CardsComponent } from './cards/cards.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CustomersComponent } from './customers/customers.component';
import { StoresComponent } from './stores/stores.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactUsAdminComponent } from './contact-us-admin/contact-us-admin.component';
import { EmployeesComponent } from './employees/employees.component';
import { ProfileComponent } from './profile/profile.component';
import { DepartamentComponent } from './departament/departament.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentRoutingModule,
    SharedModule
  ],
  declarations: [
    UserComponent,
    CardsComponent,
    TransactionsComponent,
    CustomersComponent,
    StoresComponent,
    DashboardComponent,
    ContactUsAdminComponent,
    EmployeesComponent,
    ProfileComponent,
    DepartamentComponent
  ],
  exports: [
    CustomersComponent
  ]
})
export class ComponentsModule { }
