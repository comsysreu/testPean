import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ParentModel } from './entity/common.entity';

export class Utils {

    static throwHttpException(httpStatusCode: any, message?: string) {
        switch (httpStatusCode) {
            case 200:
                throw new HttpException(message, HttpStatus.OK);
            case 400:
                throw new HttpException(message, HttpStatus.BAD_REQUEST);
            case 401:
                throw new HttpException(message, HttpStatus.UNAUTHORIZED);
            case 403:
                throw new HttpException(message, HttpStatus.FORBIDDEN);
            case 404:
                throw new HttpException(message, HttpStatus.NOT_FOUND);
            case 409:
                throw new HttpException(message, HttpStatus.CONFLICT);
            case 415:
                throw new HttpException(message, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
            case 500:
                throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
            default:
                console.log('Exception HTTP Status Code: ' + httpStatusCode);
        }
    }

    static throwHttpExceptionFromError(status: any, data: any) {
        let httpStatusCode = status;
        let message = data;
        this.throwHttpException(httpStatusCode, message);
    }

    static getTokenFromRequest(request: any): string {
        let authToken = request.headers.authorization;

        if ((authToken == undefined) || (authToken == '')) {
            throw new HttpException('Token no específicado.', HttpStatus.UNAUTHORIZED);
        }

        return authToken;
    }

    static setModelCreationValues(obj: ParentModel, userId: number) {
        obj.creationDate = new Date();
        obj.lastModifiedDate = new Date();
        obj.creationByUserId = userId;
        obj.lastModifiedByUserId = userId;
    }

    static setModelUpdateValues(obj: ParentModel, userId: number) {
        obj.lastModifiedDate = new Date();
        obj.lastModifiedByUserId = userId;
    }

}
