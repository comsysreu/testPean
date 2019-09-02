import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { ContactUs } from './contact-us.entity';
import { Utils } from '../../common/util';
import { Customer } from '../customer/customer.entity';

@Injectable()
export class ContactUsService {
    constructor(
        @InjectRepository(ContactUs)
        private readonly cardRepository: Repository<ContactUs>,
    ) { }

    async findAll(): Promise<ContactUs[]> {
        return this.cardRepository.find();
    }

    async findById(id: any): Promise<ContactUs> {
        return this.cardRepository.findOne(id);
    }

    async create(contactUs: ContactUs): Promise<ContactUs> {
        Utils.setModelCreationValues(contactUs, 0);
        return this.cardRepository.save(contactUs);
    }
}