import { Controller, Get, Post, Put, Body, Req, Param, Delete, Inject, forwardRef } from '@nestjs/common';
import { StoreService } from './store.service';
import { Store } from './store.entity';
import { Utils } from '../../common/util';
import { LoginService } from '../login/login.service';
import { Enum } from '../../common/message.enum';

@Controller('api/store')
export class StoreController {

    constructor(private storeService: StoreService,
        @Inject(forwardRef(() => LoginService))
        private loginService: LoginService
    ) { }

    @Get()
    async findAll(@Req() request) {
        const authToken = Utils.getTokenFromRequest(request);
        return this.loginService.findToken(authToken).then(resp => {
            if (resp) {
                return this.storeService.findAll().then(response => {
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
                return this.storeService.findById(id).then(respUser => {
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
                return this.storeService.findByName(name).then(respUser => {
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
    async create(@Req() request, @Body() storeEntity: Store) {
        const authToken = Utils.getTokenFromRequest(request);
        return this.loginService.findToken(authToken).then(resp => {
            if (resp) {
                return this.storeService.create(storeEntity).then(response => {
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
    async update(@Req() request, @Body() storeEntity: Store) {
        const authToken = Utils.getTokenFromRequest(request);
        return this.loginService.findToken(authToken).then(resp => {
            if (resp) {
                return this.storeService.update(storeEntity).then(response => {
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
                return this.storeService.delete(id).then(response => {
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