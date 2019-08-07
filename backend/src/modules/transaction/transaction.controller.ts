import { Controller, Get, Post, Put, Body, Req, Param, Delete, Inject, forwardRef } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { Utils } from '../../common/util';
import { LoginService } from '../login/login.service';
import { CardService } from '../card/card.service';
import { Enum } from '../../common/message.enum';

@Controller('api/transaction')
export class TransactionController {

    constructor(private transactionService: TransactionService,
        @Inject(forwardRef(() => LoginService))
        private loginService: LoginService,
        @Inject(forwardRef(() => CardService))
        private cardService: CardService
    ) { }

    @Get()
    async findAll(@Req() request) {
        const authToken = Utils.getTokenFromRequest(request);
        return this.loginService.findToken(authToken).then(resp => {
            if (resp) {
                return this.transactionService.findAll().then(response => {
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
                return this.transactionService.findById(id).then(respUser => {
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

    @Get('authorization/:authorization')
    async findByUser(@Req() request, @Param('authorization') authorization) {
        const authToken = Utils.getTokenFromRequest(request);
        return this.loginService.findToken(authToken).then(resp => {
            if (resp) {
                return this.transactionService.findByAuthorization(authorization).then(respUser => {
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
    async create(@Req() request, @Body() transactionEntity: Transaction) {
        const authToken = Utils.getTokenFromRequest(request);
        const userId = transactionEntity.user;
        const cardId = transactionEntity.card;
        //VALIDATED TOKEN
        return this.loginService.findToken(authToken).then(resp => {
            if (resp) {
                //FIND CARD
                return this.cardService.findById(cardId).then(respCard => {
                    respCard.balance = respCard.balance - transactionEntity.total;
                    //UPDATE CARD
                    return this.cardService.update(respCard).then(respCardUpdate => {
                        //CREATE TRANSACTION
                        return this.transactionService.create(transactionEntity, userId).then(response => {
                            return response;
                        }).catch(error => {
                            return error;
                        });
                    }).catch(error => {
                        return error;
                    });
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
    async update(@Req() request, @Body() transactionEntity: Transaction) {
        const authToken = Utils.getTokenFromRequest(request);
        const userId = transactionEntity.user;
        return this.loginService.findToken(authToken).then(resp => {
            if (resp) {
                return this.transactionService.update(transactionEntity, userId).then(response => {
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
                return this.transactionService.delete(id).then(response => {
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