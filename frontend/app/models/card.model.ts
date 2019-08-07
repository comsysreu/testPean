import { Customer } from './customer.model';

export class Card {
    id: number;
    cod: number;
    rode: number;
    balance: number;
    validity: Date;
    customer: Customer;
}
