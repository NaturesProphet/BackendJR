import { Controller, Post, Res, Body, Req, Catch, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth, } from '@nestjs/swagger';
import { VeiculoService } from './veiculo.service';
import { VeiculoDto } from './veiculo.dto';
import * as jwt from 'jsonwebtoken';
import { privateKey } from '../../common/configs/api.conf';
import { Usuario } from '../../JuliusReport/usuario/usuario.model';
import { Veiculo } from './veiculo.model';
@ApiUseTags( 'Veículos' )
@Controller( 'veiculo' )
export class VeiculoController {
    constructor( private readonly service: VeiculoService ) { }
    @ApiBearerAuth()
    @Post()
    @ApiOperation( { title: 'Cadastro de novos veículos' } )
    @ApiResponse( {
        status: 201,
        description: 'O registro foi processado com sucesso',
    } )
    @ApiResponse( {
        status: 422,
        description: 'A placa informada já existe',
    } )
    @ApiResponse( {
        status: 400,
        description: 'Os dados enviados não são válidos',
    } )
    @ApiResponse( {
        status: 401,
        description: 'Usuário não autenticado',
    } )


    public async salvar ( @Body() dto: VeiculoDto, @Res() res, @Req() req, ) {
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
            res.status( 403 ).send( `Não autorizado. ` );
        }
        jwt.verify( req.token, privateKey, async ( err, authorizedData ) => {
            if ( err ) {
                res.status( 403 ).send( "Não autenticado" );
            } else {
                try {
                    dto.usuario_id = authorizedData.usuario.id;
                    let veiculo = await this.service.salva( dto );
                    const msg = `Veículo ${veiculo.modelo} placas ${veiculo.placa} ` +
                        `registrado para ${authorizedData.usuario.login} `;
                    res.status( 201 ).send( msg );
                } catch ( erro ) {
                    if ( erro.message == "Esta placa já existe." ) {
                        res.status( 422 ).send( "Esta placa já existe." );
                    } else if ( erro.message == 'Dados invalidos' ) {
                        res.status( 400 ).send( 'Dados invalidos' );
                    } else {
                        res.status( 500 ).send( `Erro não especificado ${erro.message} ` );
                        console.log( erro.message )
                    }
                }
            }
        } )
    }

    @ApiBearerAuth()
    @Get()
    @ApiOperation( { title: 'Listar Veículos do Usuário' } )
    @ApiResponse( {
        status: 200,
        description: 'A busca foi feita sem erros',
    } )
    @ApiResponse( {
        status: 401,
        description: 'Usuário não autenticado',
    } )
    public async listarVeiculos ( @Res() res, @Req() req ) {
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
                    let usuario: Usuario = new Usuario();
                    let auth = authorizedData.usuario;
                    usuario.id = auth.id;
                    usuario.login = auth.login;

                    let veiculos: Veiculo[] = await usuario.getVeiculos();
                    res.status( 200 ).send( veiculos );
                } catch ( erro ) {
                    {
                        res.status( 500 ).send( `Erro não especificado ${erro.message} ` );
                        console.log( erro.message )
                    }
                }
            }
        } )
    }

}

