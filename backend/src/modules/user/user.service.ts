import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { Utils } from '../../common/util';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findById(id: any): Promise<User> {
        return this.userRepository.findOne(id);
    }

    async findByUser(user: string): Promise<User[]> {
        return this.userRepository.find({ user: user });
    }

    async findByUserNoneToken(user: string): Promise<User[]> {
        return this.userRepository.find({ user: user });
    }

    async create(userEntity: User): Promise<User> {
        var md5 = require('md5');
        userEntity.password = md5(userEntity.password);
        Utils.setModelCreationValues(userEntity, userEntity.cod);
        return this.userRepository.save(userEntity);
    }

    async update(userEntity: User): Promise<UpdateResult> {
        Utils.setModelUpdateValues(userEntity, userEntity.cod);
        return this.userRepository.update(userEntity.id, userEntity);
    }

    async delete(id: number): Promise<DeleteResult> {
        return this.userRepository.delete(id);
    }

}