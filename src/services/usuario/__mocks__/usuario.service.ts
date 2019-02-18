import { Injectable } from '@nestjs/common';
import { Usuario } from '../../../models/usuario.model';
import * as EmailValidator from 'email-validator';
import * as bcrypt from 'bcryptjs';
import { AppError } from '../../../common/error/AppError';
import { AppErrorTypeEnum } from '../../../common/error/AppErrorTypeEnum';

@Injectable()
/**
 * Serviços de Usuario
 */
export class UsuarioService {

    /**
     * Este método é responsável por registrar novos usuáriros no sistema.
     * @param pessoa Objeto Usuario parcialmente preenchido com dados de cadastro
     */
    public async cadastraNovoUsuario( pessoa: Usuario ): Promise<Usuario> {

        const test: Usuario = new Usuario(); // mocka a consulta ao banco
        test.login = 'existente'; // mocka o caso de um usuário já existente

        if ( test.login == pessoa.login ) { // mocka o caso de um usuário já existente
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
                pessoa.atualizadoem = new Date(); // mocka a query de inserção no banco
                pessoa.dataregistro = new Date(); // mocka a query de inserção no banco
                pessoa.id = 123; // mocka a query de inserção no banco
                return pessoa; // mocka a query de inserção no banco
            } else {
                throw new AppError( AppErrorTypeEnum.DADOS_INVALIDOS );
            }
        }
    }

}
