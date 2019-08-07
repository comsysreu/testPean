import { Card } from './card.model';
import { Store } from './store.model';
import { User } from './user.model';

export class Transaction {
    id: number;
    authorization: string;
    sale: number;
    date_sale: Date;
    discount_rate: number;
    discount_sale: number;
    total: number;
    card: Card;
    store: Store;
    user: User;
}
