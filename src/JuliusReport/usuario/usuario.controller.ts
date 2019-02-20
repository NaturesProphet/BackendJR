import { Controller, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.model';
import { UsuarioDto } from './usuario.dto';
import { ApiOperation, ApiResponse, ApiUseTags, ApiImplicitParam } from '@nestjs/swagger';

@ApiUseTags( 'Usuários' )
@Controller( 'usuario' )
export class usuarioController {
    constructor( private readonly service: UsuarioService ) { }

    @Post()
    @ApiOperation( { title: 'Cadastro de usuários' } )
    @ApiResponse( {
        status: 201,
        description: 'O registro foi processado com sucesso',
    } )
    @ApiResponse( {
        status: 422,
        description: 'O login informado já existe',
    } )
    @ApiResponse( {
        status: 400,
        description: 'Os dados enviados não são válidos',
    } )


    public async salvar( @Body() usuarioDto: UsuarioDto, @Res() res ) {
        try {
            const pessoa: Usuario = await this.service.cadastraNovoUsuario( usuarioDto );
            if ( pessoa ) {
                res.status( HttpStatus.CREATED ).send( `Usuario cadastrado: ${JSON.stringify( pessoa )}` );
            }
        } catch ( e ) {
            if ( e.message == "Os dados enviados são inválidos. verifique e tente novamente" ) {
                res.status( HttpStatus.BAD_REQUEST ).send( e.message );
            } else if ( e.message == 'Usuário já existe' ) {
                res.status( HttpStatus.UNPROCESSABLE_ENTITY ).send( e.message );
            }
        }
    }
}
