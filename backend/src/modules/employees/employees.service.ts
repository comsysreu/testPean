import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Employees } from './employees.entity';
import { Utils } from '../../common/util';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employees)
        private readonly employeesRepository: Repository<Employees>,
    ) { }

    async findAll(): Promise<Employees[]> {
        return this.employeesRepository.find({ relations: ["profile", "departament"] });
    }

    async findById(id: any): Promise<Employees> {
        return this.employeesRepository.findOne(id, { relations: ["profile", "departament"] });
    }

    async findByAuthorization(name: string): Promise<Employees[]> {
        return this.employeesRepository.find({ name: name });
    }

    async create(employeesEntity: Employees): Promise<Employees> {
        Utils.setModelCreationValues(employeesEntity, 123);
        return this.employeesRepository.save(employeesEntity);
    }

    async update(employeesEntity: Employees): Promise<UpdateResult> {
        Utils.setModelUpdateValues(employeesEntity, 123);
        return this.employeesRepository.update(employeesEntity.id, employeesEntity);
    }

    async delete(id: number): Promise<DeleteResult> {
        return this.employeesRepository.delete(id);
    }

}