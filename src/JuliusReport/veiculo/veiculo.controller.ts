import { Controller, Post, Res, Body, Req, Catch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, } from '@nestjs/swagger';
import { VeiculoService } from './veiculo.service';
import { VeiculoDto } from './veiculo.dto';
import * as jwt from 'jsonwebtoken';
import { privateKey } from '../../common/configs/api.conf';
@ApiUseTags( 'Veículos' )
@Controller( 'veiculo' )
export class VeiculoController {
    constructor( private readonly service: VeiculoService ) { }

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
        const header = req.headers[ 'authorization' ];
        if ( typeof header !== 'undefined' ) {
            const bearer = header.split( ' ' );
            const token = bearer[ 1 ];
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
}

