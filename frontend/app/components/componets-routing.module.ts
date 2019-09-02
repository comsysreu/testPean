import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { UserComponent } from './user/user.component';
// import { CardsComponent } from './cards/cards.component';
// import { TransactionsComponent } from './transactions/transactions.component';
// import { CustomersComponent } from './customers/customers.component';
// import { StoresComponent } from './stores/stores.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactUsAdminComponent } from './contact-us-admin/contact-us-admin.component';
import { EmployeesComponent } from './employees/employees.component';
import { ProfileComponent } from './profile/profile.component';
import { DepartamentComponent } from './departament/departament.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
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
        path: 'users',
        component: UserComponent,
        data: {
            title: 'Inicio'
        }
    },
    {
        path: 'contact-us',
        component: ContactUsAdminComponent,
        data: {
            title: 'Inicio'
        }
    },
    {
        path: 'employees',
        component: EmployeesComponent,
        data: {
            title: 'Inicio'
        }
    },
    {
        path: 'profile',
        component: ProfileComponent,
        data: {
            title: 'Inicio'
        }
    },
    {
        path: 'departament',
        component: DepartamentComponent,
        data: {
            title: 'Inicio'
        }
    },
    // {
    //     path: 'cards',
    //     component: CardsComponent,
    //     data: {
    //         title: 'Inicio'
    //     }
    // },
    // {
    //     path: 'transactions',
    //     component: TransactionsComponent,
    //     data: {
    //         title: 'Inicio'
    //     }
    // },
    // {
    //     path: 'customers',
    //     component: CustomersComponent,
    //     data: {
    //         title: 'Inicio'
    //     }
    // },
    // {
    //     path: 'stores',
    //     component: StoresComponent,
    //     data: {
    //         title: 'Inicio'
    //     }
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComponentRoutingModule {
}
