import { AppErrorTypeEnum } from './AppErrorTypeEnum';
import { IErrorMessage } from './IErrorMessage';
import { HttpStatus } from '@nestjs/common';

/**
 * Esta classe é um erro! No bom sentido rs.
 * Usarei esta classe para lançar erros a partir dos serviços
 */
export class AppError extends Error {
    public errorCode: AppErrorTypeEnum;
    public status: number;
    public errorMessage: string;
    public userMessage: string;
    public timestamp: string;

    /**
     * Método construtor que recebe um enum para selecionar o erro a ser lançado.
     * @param errorCode trata-se de um enum configurado em ./AppErrorTypeEnum
     */
    constructor( errorCode: AppErrorTypeEnum ) {
        super();
        const errorMessageConfig: IErrorMessage = this.getError( errorCode );
        if ( !errorMessageConfig ) throw new Error( 'Não encontrei o código de erro indicado' );
        Error.captureStackTrace( this, this.constructor );
        this.name = this.constructor.name;
        this.status = errorMessageConfig.status;
        this.errorCode = errorCode;
        this.errorMessage = errorMessageConfig.errorMessage;
        this.userMessage = errorMessageConfig.userMessage;
        this.timestamp = new Date().toUTCString();
    }

    /**
     * Método que envia a resposta adequada para cada tipo de erro que for lançado
     * @param errorCode 
     */
    private getError( errorCode: AppErrorTypeEnum ): IErrorMessage {
        let res: IErrorMessage; // Objeto a ser enviado como resposta às requisições
        switch ( errorCode ) {

            // post /usuario
            case AppErrorTypeEnum.USUARIO_EXISTE:
                res = {
                    type: AppErrorTypeEnum.USUARIO_EXISTE,
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    errorMessage: 'Usuário já existe',
                    userMessage: 'Este nome de usuário já existe em nossos registros. Tente outro.',
                    timestamp: new Date().toUTCString()
                };
                break;
        }


        return res;
    }
}

