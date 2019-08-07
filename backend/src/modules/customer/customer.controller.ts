import { Controller, Get, Post, Put, Body, Req, Param, Delete, Inject, forwardRef } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { Utils } from '../../common/util';
import { LoginService } from '../login/login.service';
import { Enum } from '../../common/message.enum';

@Controller('api/customer')
export class CustomerController {

    constructor(private customerService: CustomerService,
        @Inject(forwardRef(() => LoginService))
        private loginService: LoginService
    ) { }

    @Get()
    async findAll(@Req() request) {
        const authToken = Utils.getTokenFromRequest(request);
        return this.loginService.findToken(authToken).then(resp => {
            if (resp) {
                return this.customerService.findAll().then(response => {
                    return response;
                }).catch(error => {
                    return error;
                });
            } else {
                Utils.throwHttpExceptionFromError(401, Enum.NOT_AUTHORIZED);
            }
        }).catch(err => {
            return err;
        })
    }

    @Get(':id')
    async findById(@Req() request, @Param('id') id) {
        const authToken = Utils.getTokenFromRequest(request);

        return this.loginService.findToken(authToken).then(resp => {
            if (resp) {
                return this.customerService.findById(id).then(respUser => {
                    if (respUser != undefined) {
                        return respUser;
                    } else {
                        Utils.throwHttpExceptionFromError(404, Enum.NOT_FOUND);
                    }
                }).catch(errUser => {
                    return errUser;
                })
            } else {
                Utils.throwHttpExceptionFromError(401, Enum.NOT_AUTHORIZED);
            }
        }).catch(err => {
            return err;
        })
    }

    @Get('name/:name')
    async findByName(@Req() request, @Param('name') name) {
        const authToken = Utils.getTokenFromRequest(request);
        return this.loginService.findToken(authToken).then(resp => {
            if (resp) {
                return this.customerService.findByName(name).then(respUser => {
                    if (respUser.length > 0) {
                        return respUser[0];
                    } else {
                        Utils.throwHttpExceptionFromError(404, Enum.NOT_FOUND);
                    }
                }).catch(error => {
                    return error;
                });
            } else {
                Utils.throwHttpExceptionFromError(401, Enum.NOT_AUTHORIZED);
            }
        }).catch(err => {
            return err;
        })
    }

    @Post()
    async create(@Req() request, @Body() userEntity: Customer) {
        const authToken = Utils.getTokenFromRequest(request);
        return this.loginService.findToken(authToken).then(resp => {
            if (resp) {
                return this.customerService.create(userEntity).then(response => {
                    return response;
                }).catch(error => {
                    return error;
                });
            } else {
                Utils.throwHttpExceptionFromError(401, Enum.NOT_AUTHORIZED);
            }
        }).catch(err => {
            return err;
        })
    }

    @Put()
    async update(@Req() request, @Body() userEntity: Customer) {
        const authToken = Utils.getTokenFromRequest(request);
        return this.loginService.findToken(authToken).then(resp => {
            if (resp) {
                return this.customerService.update(userEntity).then(response => {
                    return response;
                }).catch(error => {
                    return error;
                });
            } else {
                Utils.throwHttpExceptionFromError(401, Enum.NOT_AUTHORIZED);
            }
        }).catch(err => {
            return err;
        })

    }

    @Delete(':id')
    async delete(@Req() request, @Param('id') id) {
        const authToken = Utils.getTokenFromRequest(request);
        return this.loginService.findToken(authToken).then(resp => {
            if (resp) {
                return this.customerService.delete(id).then(response => {
                    return true;
                }).catch(error => {
                    return error;
                });
            } else {
                Utils.throwHttpExceptionFromError(401, Enum.NOT_AUTHORIZED);
            }
        }).catch(err => {
            return err;
        })
    }

}