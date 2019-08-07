import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentRoutingModule } from './componets-routing.module';
import { UserComponent } from './user/user.component';
import { SharedModule } from '../shared/shared.module';
import { CardsComponent } from './cards/cards.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CustomersComponent } from './customers/customers.component';
import { StoresComponent } from './stores/stores.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentRoutingModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    CardsComponent,
    TransactionsComponent,
    CustomersComponent,
    StoresComponent
  ],
  exports: [
    DashboardComponent
  ]
})
export class ComponentsModule { }
