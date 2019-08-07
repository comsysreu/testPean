import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ParentModel {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    creationDate: Date;

    @Column()
    creationByUserId: number;

    @Column()
    lastModifiedDate: Date;

    @Column()
    lastModifiedByUserId: number;
}