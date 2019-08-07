import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { UserComponent } from './user/user.component';
import { CardsComponent } from './cards/cards.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CustomersComponent } from './customers/customers.component';
import { StoresComponent } from './stores/stores.component';

const routes: Routes = [
    {
        path: '',
        component: CustomersComponent,
        data: {
            title: 'Inicio'
        }
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
        data: {
            title: 'Inicio'
        }
    },
    {
        path: 'cards',
        component: CardsComponent,
        data: {
            title: 'Inicio'
        }
    },
    {
        path: 'transactions',
        component: TransactionsComponent,
        data: {
            title: 'Inicio'
        }
    },
    {
        path: 'customers',
        component: CustomersComponent,
        data: {
            title: 'Inicio'
        }
    },
    {
        path: 'users',
        component: UserComponent,
        data: {
            title: 'Inicio'
        }
    },
    {
        path: 'stores',
        component: StoresComponent,
        data: {
            title: 'Inicio'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComponentRoutingModule {
}
