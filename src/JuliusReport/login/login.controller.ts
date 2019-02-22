import { Controller, Post, Res, Body, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { Usuario } from '../../JuliusReport/usuario/usuario.model';
import { loginPayload } from './loginPayload.dto';

@ApiUseTags( 'Autenticação' )
@Controller( 'login' )
export class LoginController {
    constructor( private readonly service: LoginService ) { }

    @Post()
    @ApiOperation( { title: 'Autenticação' } )
    @ApiResponse( {
        status: 200,
        description: 'O usuário foi autenticado e seus dados estão no cookie da seção',
    } )
    @ApiResponse( {
        status: 401,
        description: 'As credenciais não batem',
    } )
    @ApiResponse( {
        status: 406,
        description: 'O login informado não foi encontrado',
    } )
    /**
     * Este método verifica as credenciais que o usuário informou e compara com os dados
     * no banco. se forem compatíveis, o usuário é recuperado e enviado na seção em um cookie
     * @param auth payload json contendo o login e a senha crua do usuário
     */
    public async login ( @Body() auth: loginPayload, @Res() res, @Req() req ) {
        let usuario: Usuario;
        try {
            usuario = await this.service.login( auth.login, auth.senha );
            res.clearCookie( 'JuliusReport', '*' ); // limpa eventuais cookies anteriores
            req.session.usuario = usuario; // coloca o usuario autenticado no cookie da seção
            return res.status( 200 ).send( 'autorizado' );
        } catch ( e ) {
            if ( e.status == 401 ) {
                res.status( 401 ).send( 'Autorização negada. As credenciais não bateram' );
            } else if ( e.message == 'O login informado não foi encontrado' ) {
                res.status( 406 ).send( e.message );
            } else {
                res.status( 500 ).send( `Erro não especificado.\n${e.message}` );
            }
        }
    }
}

