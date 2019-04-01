import { Controller, Post, Res, Body, Req, Get } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostoService } from './posto.service';
import { PostoDto } from './posto.dto';
import * as jwt from 'jsonwebtoken';
import { privateKey } from '../../common/configs/api.conf';
import { Posto } from './posto.model';
import { LoginService } from '../login/login.service';


@ApiUseTags( 'Postos de combustível' )
@Controller( 'posto' )
export class PostoController {
    constructor( private readonly service: PostoService ) { }


    @ApiBearerAuth()
    @Post()
    @ApiOperation( { title: 'Cadastro de novos postos' } )
    @ApiResponse( {
        status: 201,
        description: 'O registro foi processado com sucesso',
    } )
    @ApiResponse( {
        status: 422,
        description: 'O nome informado já existe',
    } )
    @ApiResponse( {
        status: 400,
        description: 'Os dados enviados não são válidos',
    } )
    @ApiResponse( {
        status: 401,
        description: 'Usuário não autenticado',
    } )


    public async salvar ( @Body() dto: PostoDto, @Res() res, @Req() req, ) {

        await LoginService.getAuthentication( req );

        try {
            let posto = await this.service.salva( dto );
            res.status( 201 ).send( `Posto ${posto.nome} registrado` );
        } catch ( erro ) {
            if ( erro.message == "Este nome já existe." ) {
                res.status( 422 ).send( "Este nome já existe." );
            } else if ( erro.message == 'Dados invalidos' ) {
                res.status( 400 ).send( 'Dados invalidos' );
            } else {
                res.status( 500 ).send( `Erro não especificado ${erro.message} ` );
                console.log( erro.message )
            }
        }

    }



    @ApiBearerAuth()
    @Get()
    @ApiOperation( { title: 'Listar Postos de combustível' } )
    @ApiResponse( {
        status: 200,
        description: 'A busca foi feita sem erros',
    } )
    @ApiResponse( {
        status: 401,
        description: 'Usuário não autenticado',
    } )

    public async listarPostos ( @Res() res, @Req() req ) {

        await LoginService.getAuthentication( req );
        try {
            let postos: Posto[] = await this.service.getPostos();
            res.status( 200 ).send( postos );
        } catch ( erro ) {
            {
                res.status( 500 ).send( `Erro não especificado ${erro.message} ` );
                console.log( erro.message )
            }
        }
    }
}
