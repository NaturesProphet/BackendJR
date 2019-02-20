import { Injectable } from '@nestjs/common';
import { Usuario } from '../usuario.model';
import * as EmailValidator from 'email-validator';
import { UsuarioDto } from '../usuario.dto';

@Injectable()
/**
 * Serviços de Usuario
 */
export class UsuarioService {

    /**
     * Este método é responsável por registrar novos usuáriros no sistema.
     * @param pessoa Objeto Usuario parcialmente preenchido com dados de cadastro
     */
    public async cadastraNovoUsuario( pessoa: UsuarioDto ): Promise<Usuario> {

        const test: Usuario = new Usuario(); // mocka a consulta ao banco
        test.login = 'existente'; // mocka o caso de um usuário já existente

        if ( test.login == pessoa.login ) { // mocka o caso de um usuário já existente
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
                usuario.atualizadoem = new Date(); // mocka a query de inserção no banco
                usuario.dataregistro = new Date(); // mocka a query de inserção no banco
                usuario.id = 123; // mocka a query de inserção no banco
                return usuario; // mocka a query de inserção no banco
            } else {
                throw new Error( "Os dados informados são inválidos, verifique e tente novamente" );
            }
        }
    }
}
