import { Injectable, UnauthorizedException, Req } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcryptjs';
import { Usuario } from 'JuliusReport/usuario/usuario.model';
import * as jwt from 'jsonwebtoken';
import { privateKey } from '../../common/configs/api.conf';

@Injectable()
export class LoginService {

    /**
     * Este método é responsável por autenticar os usuários através da verificação
     * de compatibilidade entre a senha bruta do usuário e seu hash salvo no banco.
     * Se a senha e o hash forem compatíveis, o usuário é retornado pelo método, senão,
     * lança uma exception 401
     * @param login username do usuário
     * @param pass senha pura do usuário
     */
    async login ( login: string, pass: string ) {

        const usuario: Usuario = await UsuarioService.getOne( login );
        // a comparação entre senha e hash retorna true se forem compatíveis
        const souEu: boolean = await bcrypt.compare( pass, usuario.getHash() );
        if ( souEu ) {
            usuario.veiculos = await usuario.getVeiculos();
            if ( usuario.veiculos.length == 1 ) {
                usuario.veiculoDefault = usuario.veiculos[ 0 ];
            } else {
                usuario.veiculoDefault = null;
            }
            return usuario;
        } else {
            throw new UnauthorizedException();
        }
    }


    /**
     * Este método verifica se o o usuário está autenticado
     * @param req requisição http integral
     * @returns Objeto com o usuário logado e seus dados de seção
     */
    static async getAuthentication ( @Req() req ): Promise<any> {
        // pega o valor da chave 'authorization' nos headers da requisição
        const header = req.headers[ 'authorization' ];

        if ( typeof header !== 'undefined' ) {
            // verifica se tem a palavra 'Bearer ' antes do token e ajusta ao caso
            const bearer = header.split( ' ' );
            let token = bearer[ 1 ];
            if ( token == undefined ) {
                token = header;
            }

            return await jwt.verify( token, privateKey );

        } else {
            throw new UnauthorizedException( `Não autenticado` );
        }

    }
}
