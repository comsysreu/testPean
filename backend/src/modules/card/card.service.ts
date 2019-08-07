import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Card } from './card.entity';
import { Utils } from '../../common/util';
import { Customer } from '../customer/customer.entity';

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(Card)
        private readonly cardRepository: Repository<Card>,
    ) { }

    async findAll(): Promise<Card[]> {
        return this.cardRepository.find({ relations: ["customer"] });
    }

    async findById(id: any): Promise<Card> {
        return this.cardRepository.findOne(id, { relations: ["customer"] });
    }

    async findByCustomerId(customerId: Customer): Promise<Card[]> {
        return this.cardRepository.find({ customer: customerId });
    }

    async create(userEntity: Card): Promise<Card> {
        Utils.setModelCreationValues(userEntity, userEntity.cod);
        return this.cardRepository.save(userEntity);
    }

    async update(userEntity: Card): Promise<UpdateResult> {
        Utils.setModelUpdateValues(userEntity, userEntity.cod);
        return this.cardRepository.update(userEntity.id, userEntity);
    }

    async delete(id: number): Promise<DeleteResult> {
        return this.cardRepository.delete(id);
    }

}