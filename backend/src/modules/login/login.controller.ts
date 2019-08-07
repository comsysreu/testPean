import { Controller, Get, Post, Put, Body, Req, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { Login } from './login.entity';
import { Utils } from '../../common/util';
import { Enum } from '../../common/message.enum';

@Controller('api/login')
export class LoginController {

    constructor(private loginService: LoginService
    ) { }

    @Get()
    async findAll() {
        return this.loginService.findAll().then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }

    @Get(':id')
    async findById(@Param('id') id) {
        return this.loginService.findById(id).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }    

    @Post('validated-token')
    async findToken(@Req() request) {
        const authToken = Utils.getTokenFromRequest(request);

        return this.loginService.findToken(authToken).then(response => {
            return response;
        }).catch(error => {
            Utils.throwHttpExceptionFromError(401, Enum.NOT_AUTHORIZED);
        });
    }

    @Post()
    async create(@Body() loginEntity: Login) {
        return this.loginService.create(loginEntity).then(response => {
            if (response.token != undefined) {
                return response.token
            } else {
                return response;
            }
        }).catch(error => {
            return error;
        });
    }

    @Delete(':id')
    async delete(@Param('id') id) {
        return this.loginService.delete(id).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }
}