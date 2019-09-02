import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { ParentModel } from '../../common/entity/common.entity';
import { Profile } from '../profile/profile.entity';
import { Departament } from '../departament/departament.entity';

@Entity()
export class Employees extends ParentModel {

  @Column()
  cod: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: number;

  @ManyToOne(type => Profile, profile => profile.id)
  @JoinColumn()
  profile: Profile;
  
  @ManyToOne(type => Departament, departament => departament.id)
  @JoinColumn()
  departament: Departament;
}