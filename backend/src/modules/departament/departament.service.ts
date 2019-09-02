import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Departament } from './departament.entity';
import { Utils } from '../../common/util';

@Injectable()
export class DepartamentService {
    constructor(
        @InjectRepository(Departament)
        private readonly departamentRepository: Repository<Departament>,
    ) { }

    async findAll(): Promise<Departament[]> {
        return this.departamentRepository.find();
    }

    async findById(id: any): Promise<Departament> {
        return this.departamentRepository.findOne(id);
    }

    async findByName(name: string): Promise<Departament[]> {
        return this.departamentRepository.find({ name: name });
    }

    async create(departamentEntity: Departament): Promise<Departament> {
        Utils.setModelCreationValues(departamentEntity, departamentEntity.cod);
        return this.departamentRepository.save(departamentEntity);
    }

    async update(departamentEntity: Departament): Promise<UpdateResult> {
        Utils.setModelUpdateValues(departamentEntity, departamentEntity.cod);
        return this.departamentRepository.update(departamentEntity.id, departamentEntity);
    }

    async delete(id: number): Promise<DeleteResult> {
        return this.departamentRepository.delete(id);
    }

}