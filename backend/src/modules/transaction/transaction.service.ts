import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Transaction } from './transaction.entity';
import { Utils } from '../../common/util';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
    ) { }

    async findAll(): Promise<Transaction[]> {
        return this.transactionRepository.find({ relations: ["card", "store", "user"] });
    }

    async findById(id: any): Promise<Transaction> {
        return this.transactionRepository.findOne(id, { relations: ["card", "store", "user"] });
    }

    async findByAuthorization(authorization: string): Promise<Transaction[]> {
        return this.transactionRepository.find({ authorization: authorization });
    }

    async create(transactionEntity: Transaction, userId: any): Promise<Transaction> {
        let user = parseInt(userId, 10);
        Utils.setModelCreationValues(transactionEntity, user);
        const authorization = Math.floor((Math.random() * 99999) + 1);
        transactionEntity.authorization = authorization.toString(),
        transactionEntity.date_sale = transactionEntity.creationDate;
        return this.transactionRepository.save(transactionEntity);
    }

    async update(transactionEntity: Transaction, userId: any): Promise<UpdateResult> {
        let user = parseInt(userId, 10);
        Utils.setModelUpdateValues(transactionEntity, user);
        return this.transactionRepository.update(transactionEntity.id, transactionEntity);
    }

    async delete(id: number): Promise<DeleteResult> {
        return this.transactionRepository.delete(id);
    }

}