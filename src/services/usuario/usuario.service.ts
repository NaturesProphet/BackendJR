import { Injectable } from '@nestjs/common';
import { Usuario } from '../../models/usuario.model';
import * as EmailValidator from 'email-validator';
import * as bcrypt from 'bcryptjs';
import { AppError } from '../../common/error/AppError';
import { AppErrorTypeEnum } from '../../common/error/AppErrorTypeEnum';

@Injectable()
/**
 * Serviços de Usuario
 */
export class UsuarioService {

    /**
     * Este método é resposnavel por registrar novos usuáriros no sistema.
     * @param pessoa Objeto Usuario parcialmente preenchido com dados de cadastro
     */
    public async cadastraNovoUsuario( pessoa: Usuario ): Promise<Usuario> {

        const test: Usuario = await Usuario.findOne( { login: pessoa.login } );

        if ( test ) {
            throw new AppError( AppErrorTypeEnum.USUARIO_EXISTE );
        } else {
            // validação
            if (
                pessoa.email
                && EmailValidator.validate( pessoa.email )
                && pessoa.login
                && pessoa.login.length > 2
                && pessoa.nome
                && pessoa.nome.length > 3
                && pessoa.passwordHash
                && pessoa.passwordHash.length > 6 ) {
                const hash = bcrypt.hashSync( pessoa.passwordHash );
                pessoa.passwordHash = hash;
                return await Usuario.save( pessoa );
            } else {
                throw new AppError( AppErrorTypeEnum.DADOS_INVALIDOS );
            }
        }
    }

}
