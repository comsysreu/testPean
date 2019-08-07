import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login } from './login.entity';
import { UserService } from '../user/user.service';
import { Utils } from '../../common/util';
import { Enum } from '../../common/message.enum';

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(Login)
        private readonly loginRepository: Repository<Login>,
        @Inject(forwardRef(() => UserService))
        private userService: UserService
    ) { }

    findAll(): Promise<Login[]> {
        return this.loginRepository.find();
    }

    findById(id: any): Promise<Login[]> {
        return this.loginRepository.findByIds(id);
    }

    async findByTokenDelete(token: string): Promise<Login[]> {
        return this.loginRepository.find({ token: token });
    }


    async findToken(token: string): Promise<Login[]> {
        let response;
        await this.loginRepository.find({ token: token }).then(resp => {
            if (resp[0] && resp[0].token == token) {
                let diff = new Date().getTime() - new Date(resp[0].creationDate).getTime();
                //valid token 4 hours
                if (diff / (1000 * 60 * 60) > 4) {
                    this.delete(token);
                    response = false;
                } else {
                    response = true;
                }
            } else {
                response = false;
            }
        });
        return response;
    }

    async create(loginEntity: Login): Promise<Login> {
        let response;
        await this.userService.findByUserNoneToken(loginEntity.user.toLowerCase()).then(resp => {

            var md5 = require('md5');
            loginEntity.password = md5(loginEntity.password);

            if (resp[0] && resp[0].user == loginEntity.user.toLowerCase() && loginEntity.password == resp[0].password) {
                var randtoken = require('rand-token');
                var token = randtoken.generate(128);
                Utils.setModelCreationValues(loginEntity, resp[0].cod);
                loginEntity.password = "";
                loginEntity.token = token;
                response = this.loginRepository.save(loginEntity);
            } else if (resp.length == 0) {
                response = {
                    "message": Enum.USER_NOT_FOUND,
                }
            } else {
                response = {
                    "message": Enum.INCORRECT_PASSWORD,
                }
            }
        }).catch(err => {
            response = err;
        });
        return response;
    }

    async delete(token: string): Promise<Login> {
        let response;
        await this.findByTokenDelete(token).then(resp => {
            if (resp[0].id) {
                this.loginRepository.delete(resp[0].id);
                response = true;
            } else {
                response = false;
            }
        })
        return response;
    }

}