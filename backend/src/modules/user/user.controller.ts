import { Controller, Get, Post, Put, Body, Req, Param, Delete, Inject, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Utils } from '../../common/util';
import { LoginService } from '../login/login.service';
import { Enum } from '../../common/message.enum';

@Controller('api/user')
export class UserController {

    constructor(private userService: UserService,
        @Inject(forwardRef(() => LoginService))
        private loginService: LoginService
    ) { }

    @Get()
    async findAll(@Req() request) {
        const authToken = Utils.getTokenFromRequest(request);
        return this.loginService.findToken(authToken).then(resp => {
            if (resp) {
                return this.userService.findAll().then(response => {
                    response.map(current => {
                        delete current.password;
                    })
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
                return this.userService.findById(id).then(respUser => {
                    if (respUser != undefined) {
                        delete respUser.password;
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

    @Get('user/:user')
    async findByUser(@Req() request, @Param('user') user) {
        const authToken = Utils.getTokenFromRequest(request);
        return this.loginService.findToken(authToken).then(resp => {
            if (resp) {
                return this.userService.findByUser(user).then(respUser => {
                    if (respUser.length > 0) {
                        delete respUser[0].password;
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
    async create(@Req() request, @Body() userEntity: User) {
        // const authToken = Utils.getTokenFromRequest(request);
        // return this.loginService.findToken(authToken).then(resp => {
        //     if (resp) {
        return this.userService.findByUser(userEntity.user).then(respUser => {
            if (respUser.length > 0 && respUser[0].user == userEntity.user) {
                Utils.throwHttpExceptionFromError(409, Enum.USER_CONFLICT);
            } else {
                return this.userService.create(userEntity).then(response => {
                    return response;
                }).catch(error => {
                    return error;
                });
            }
        })
        //     } else {
        //         Utils.throwHttpExceptionFromError(401, Enum.NOT_AUTHORIZED);
        //     }
        // }).catch(err => {
        //     return err;
        // })
    }

    @Put()
    async update(@Req() request, @Body() userEntity: User) {
        const authToken = Utils.getTokenFromRequest(request);
        return this.userService.update(userEntity).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }

    @Delete(':id')
    async delete(@Req() request, @Param('id') id) {
        const authToken = Utils.getTokenFromRequest(request);
        return this.userService.delete(id).then(response => {
            return true;
        }).catch(error => {
            return error;
        });
    }

}