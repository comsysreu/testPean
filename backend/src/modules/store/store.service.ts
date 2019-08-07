import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Store } from './store.entity';
import { Utils } from '../../common/util';

@Injectable()
export class StoreService {
    constructor(
        @InjectRepository(Store)
        private readonly customerRepository: Repository<Store>,
    ) { }

    async findAll(): Promise<Store[]> {
        return this.customerRepository.find();
    }

    async findById(id: any): Promise<Store> {
        return this.customerRepository.findOne(id);
    }

    async findByName(name: string): Promise<Store[]> {
        return this.customerRepository.find({ name: name });
    }

    async create(storeEntity: Store): Promise<Store> {
        Utils.setModelCreationValues(storeEntity, storeEntity.cod);
        return this.customerRepository.save(storeEntity);
    }

    async update(storeEntity: Store): Promise<UpdateResult> {
        Utils.setModelUpdateValues(storeEntity, storeEntity.cod);
        return this.customerRepository.update(storeEntity.id, storeEntity);
    }

    async delete(id: number): Promise<DeleteResult> {
        return this.customerRepository.delete(id);
    }

}