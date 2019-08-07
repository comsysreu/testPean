import { Controller, Get, Post, Put, Body, Req, Param, Delete, Inject, forwardRef } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from './card.entity';
import { Utils } from '../../common/util';
import { LoginService } from '../login/login.service';
import { Enum } from '../../common/message.enum';

@Controller('api/card')
export class CardController {

    constructor(private cardService: CardService,
        @Inject(forwardRef(() => LoginService))
        private loginService: LoginService
    ) { }

    @Get()
    async findAll(@Req() request) {
        const authToken = Utils.getTokenFromRequest(request);
        return this.loginService.findToken(authToken).then(resp => {
            if (resp) {
                return this.cardService.findAll().then(response => {
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
                return this.cardService.findById(id).then(respUser => {
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

    @Get('customer/:customerId')
    async findByUser(@Req() request, @Param('customerId') customerId) {
        const authToken = Utils.getTokenFromRequest(request);
        return this.loginService.findToken(authToken).then(resp => {
            if (resp) {
                return this.cardService.findByCustomerId(customerId).then(respUser => {
                    if (respUser.length > 0) {
                        return respUser;
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
    async create(@Req() request, @Body() userEntity: Card) {
        const authToken = Utils.getTokenFromRequest(request);
        return this.loginService.findToken(authToken).then(resp => {
            if (resp) {
                return this.cardService.create(userEntity).then(response => {
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
    async update(@Req() request, @Body() userEntity: Card) {
        const authToken = Utils.getTokenFromRequest(request);
        return this.loginService.findToken(authToken).then(resp => {
            if (resp) {
                return this.cardService.update(userEntity).then(response => {
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
                return this.cardService.delete(id).then(response => {
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