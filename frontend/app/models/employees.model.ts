import { Profile } from './profile.model';
import { Departament } from './departament.model';

export class Employees {
    id: number;
    cod: number;
    name: string;
    email: string;
    phone: number
    profile: Profile;
    departament: Departament;
}