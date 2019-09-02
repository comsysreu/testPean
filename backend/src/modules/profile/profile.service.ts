import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Profile } from './profile.entity';
import { Utils } from '../../common/util';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
    ) { }

    async findAll(): Promise<Profile[]> {
        return this.profileRepository.find();
    }

    async findById(id: any): Promise<Profile> {
        return this.profileRepository.findOne(id);
    }

    async findByName(name: string): Promise<Profile[]> {
        return this.profileRepository.find({ name: name });
    }

    async create(profileEntity: Profile): Promise<Profile> {
        Utils.setModelCreationValues(profileEntity, profileEntity.cod);
        return this.profileRepository.save(profileEntity);
    }

    async update(profileEntity: Profile): Promise<UpdateResult> {
        Utils.setModelUpdateValues(profileEntity, profileEntity.cod);
        return this.profileRepository.update(profileEntity.id, profileEntity);
    }

    async delete(id: number): Promise<DeleteResult> {
        return this.profileRepository.delete(id);
    }

}