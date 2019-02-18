import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AppError } from '../error/AppError';


@Catch()
/**
 * captura globalmente TODAS as Exceptions lançadas sem tratamento local.
 */
export class DispatchError implements ExceptionFilter {
    catch( exception: any, host: ArgumentsHost ): any {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();

        if ( exception instanceof AppError ) {
            return res.status( exception.status ).json( {
                errorCode: exception.errorCode,
                errorMsg: exception.errorMessage,
                usrMsg: exception.userMessage,
                httpCode: exception.status,
                timestamp: exception.timestamp
            } );

        } else if ( exception instanceof UnauthorizedException ) {
            return res.status( HttpStatus.UNAUTHORIZED ).json( exception.message );

        } else if ( exception instanceof NotFoundException ) {
            return res.status( HttpStatus.NOT_FOUND ).json( exception.message );
        }
        else if ( exception.status === 403 ) {
            return res.status( HttpStatus.FORBIDDEN ).json( exception.message );
        }
        else {
            return res.status( HttpStatus.INTERNAL_SERVER_ERROR ).send( exception.message );
        }
    }
}

