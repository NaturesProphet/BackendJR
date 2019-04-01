import { Controller, Post, Res, Body, Req, Get } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostoService } from './posto.service';
import { PostoDto } from './posto.dto';
import * as jwt from 'jsonwebtoken';
import { privateKey } from '../../common/configs/api.conf';
import { Posto } from './posto.model';


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

        // pega o valor da chave 'authorization' nos headers da requisição
        const header = req.headers[ 'authorization' ];

        if ( typeof header !== 'undefined' ) {
            // verifica se tem a palavra 'Bearer ' antes do token e ajusta ao caso
            const bearer = header.split( ' ' );
            let token = bearer[ 1 ];
            if ( token == undefined ) {
                token = header;
            }
            // coloca o token no objeto de requisição e segue pro service
            req.token = token;
        } else {
            res.status( 401 ).send( `Não autorizado. ` );
        }
        jwt.verify( req.token, privateKey, async ( err, authorizedData ) => {
            if ( err ) {
                res.status( 401 ).send( "Não autenticado" );
            } else {
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
        } );
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
        const header = req.headers[ 'authorization' ];
        if ( typeof header !== 'undefined' ) {
            // verifica se tem a palavra 'Bearer ' antes do token e ajusta ao caso
            const bearer = header.split( ' ' );
            let token = bearer[ 1 ];
            if ( token == undefined ) {
                token = header;
            }
            // coloca o token no objeto de requisição e segue pro service
            req.token = token;
        } else {
            res.status( 401 ).send( `Não autorizado. ` );
        }
        jwt.verify( req.token, privateKey, async ( err, authorizedData ) => {
            if ( err ) {
                res.status( 401 ).send( "Não autenticado" );
            } else {
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
        } );
    }

}

