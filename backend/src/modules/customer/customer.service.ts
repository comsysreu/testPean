import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Customer } from './customer.entity';
import { Utils } from '../../common/util';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) { }

    async findAll(): Promise<Customer[]> {
        return this.customerRepository.find();
    }

    async findById(id: any): Promise<Customer> {
        return this.customerRepository.findOne(id);
    }

    async findByName(name: string): Promise<Customer[]> {
        return this.customerRepository.find({ name: name });
    }

    async create(customerEntity: Customer): Promise<Customer> {
        Utils.setModelCreationValues(customerEntity, customerEntity.cod);
        return this.customerRepository.save(customerEntity);
    }

    async update(customerEntity: Customer): Promise<UpdateResult> {
        Utils.setModelUpdateValues(customerEntity, customerEntity.cod);
        return this.customerRepository.update(customerEntity.id, customerEntity);
    }

    async delete(id: number): Promise<DeleteResult> {
        return this.customerRepository.delete(id);
    }

}