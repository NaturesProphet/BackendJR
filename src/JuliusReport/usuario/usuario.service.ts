import { Injectable } from '@nestjs/common';
import * as EmailValidator from 'email-validator';
import { Usuario } from './usuario.model';
import { AppError } from '../../common/error/AppError';
import { AppErrorTypeEnum } from '../../common/error/AppErrorTypeEnum';
import { UsuarioDto } from './usuario.dto';


@Injectable()
/**
 * Serviços de Usuario
 */
export class UsuarioService {

    /**
     * Este método é resposnavel por registrar novos usuáriros no sistema.
     * @param pessoa Interface UsuarioDto, preenchida com dados de cadastro, 
     * os campos login, senha, nome e email devem estar obrigatoriamente preenchidos 
     * e válidos, os restantes podem ser nulos se assim desejar.
     */
    public async cadastraNovoUsuario( pessoa: UsuarioDto ): Promise<Usuario> {

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
                && pessoa.senha
                && pessoa.senha.length > 6 ) {
                let usuario: Usuario = new Usuario();
                usuario.nome = pessoa.nome;
                usuario.email = pessoa.email;
                usuario.login = pessoa.login;
                usuario.setPassword( pessoa.senha );
                // campos passiveis de serem nulos
                if ( pessoa.telefone ) {
                    usuario.telefone = pessoa.telefone;
                }
                if ( pessoa.endereco ) {
                    usuario.endereco = pessoa.endereco;
                }
                return await Usuario.save( usuario );
            } else {
                throw new AppError( AppErrorTypeEnum.DADOS_INVALIDOS );
            }
        }
    }
}
