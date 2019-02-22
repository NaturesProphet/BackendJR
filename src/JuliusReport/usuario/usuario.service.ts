import { Injectable } from '@nestjs/common';
import * as EmailValidator from 'email-validator';
import { Usuario } from './usuario.model';
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
     * @returns Usuario
     */
    public async cadastraNovoUsuario ( pessoa: UsuarioDto ): Promise<Usuario> {

        const test: Usuario = await Usuario.findOne( { login: pessoa.login } );

        if ( test ) {
            throw new Error( "Este nome de usuário já existe em nossos registros. Tente outro." );
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
                throw new Error( "Os dados informados são inválidos, verifique e tente novamente" );
            }
        }
    }

    /**
     * Este método busca um usuário no banco pelo seu login.
     * @param loginName username do usuário
     * @returns Usuario
     */
    public static async getOne ( loginName: string ): Promise<Usuario> {
        let user = await Usuario.findOne( { where: { login: loginName } } );
        if ( !user ) {
            throw new Error( 'O login informado não foi encontrado' );
        }
        return user;
    }
}
