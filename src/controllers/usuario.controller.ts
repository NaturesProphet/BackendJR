import { Get, Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { UsuarioService } from 'services/usuario/usuario.service';
import { Usuario } from 'models/usuario.model';


@Controller( 'usuario' )
export class usuarioController {
    constructor( private readonly service: UsuarioService ) { }

    @Post()
    public async salvar( @Req() req, @Res() res ) {
        const pessoa: Usuario = await this.service.cadastraNovoUsuario( Object.assign( req.body ) );
        if ( pessoa ) {
            res.status( HttpStatus.OK ).send( `Usuario cadastrado: ${JSON.stringify( pessoa )}` );
        }
    }
}
