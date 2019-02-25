import { Controller, Post, Res, Body, Req, Catch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, } from '@nestjs/swagger';
import { VeiculoService } from './veiculo.service';
import { VeiculoDto } from './veiculo.dto';
import * as jwt from 'jsonwebtoken';
import { privateKey } from '../../common/configs/api.conf';
const teste = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoxLCJkYXRhcmVnaXN0cm8iOiIyMDE5LTAyLTI0VDIyOjQ0OjAzLjY2MFoiLCJhdHVhbGl6YWRvZW0iOiIyMDE5LTAyLTI0VDIyOjQ0OjAzLjY2MFoiLCJub21lIjoibWdhcmNpYSIsImVtYWlsIjoiZ2FyY0B0ZXN0ZS5jb20iLCJ0ZWxlZm9uZSI6IjEyMzEyMzEyMzEyIiwiZW5kZXJlY28iOiIxMjMzMjEgMTMyIDEyIiwibG9naW4iOiJtZ2FyY2lhIiwicGFzc3dvcmRIYXNoIjoiJDJhJDEwJGsvdlRvQkR2OWtVei5uYnY4YkJoLi5SOThYaTAuaC84T3kuV2hxU0xTdWtITkV0bFc1WDE2IiwidmVpY3Vsb3MiOlt7ImlkIjozLCJkYXRhcmVnaXN0cm8iOiIyMDE5LTAyLTI0VDIyOjQ0OjEwLjI1MloiLCJhdHVhbGl6YWRvZW0iOiIyMDE5LTAyLTI0VDIyOjQ0OjEwLjI1MloiLCJwbGFjYSI6Im10azJzMjAyIiwiY29yIjoiYXp1bCIsIm1hcmNhIjoiZmlhdCIsIm1vZGVsbyI6InBhbGlvIGZpcmUiLCJhbm9GcmFicmljYWNhbyI6MjAwOSwiYW5vTW9kZWxvIjoyMDEwLCJvYnNlcnZhY29lcyI6bnVsbH0seyJpZCI6NCwiZGF0YXJlZ2lzdHJvIjoiMjAxOS0wMi0yNFQyMjo0NTowMS4wNjdaIiwiYXR1YWxpemFkb2VtIjoiMjAxOS0wMi0yNFQyMjo0NTowMS4wNjdaIiwicGxhY2EiOiJtdGsyczJzMDIiLCJjb3IiOiJnIiwibWFyY2EiOiJmaWF0IiwibW9kZWxvIjoicGFsaW8gZmlyZSIsImFub0ZyYWJyaWNhY2FvIjoyMDA5LCJhbm9Nb2RlbG8iOjIwMTAsIm9ic2VydmFjb2VzIjpudWxsfV0sInZlaWN1bG9EZWZhdWx0IjpudWxsfSwiaWF0IjoxNTUxMDU5OTU3LCJleHAiOjE1NTEwNjM1NTd9.tL78gHZdvJaglG6TpaGfrq-hve23IsSnvuYPAYXmaic";
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
                console.log( `Falha no callback ${err}` );
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
                    }
                }
            }
        } )
    }
}

