import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcryptjs';
import { Usuario } from 'JuliusReport/usuario/usuario.model';

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
}
