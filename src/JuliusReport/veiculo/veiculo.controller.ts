import { Controller, Post, Res, HttpStatus, Body, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiImplicitParam } from '@nestjs/swagger';
import { VeiculoService } from './veiculo.service';
import { VeiculoDto } from './veiculo.dto';

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


    public async salvar ( @Body() dto: VeiculoDto, @Res() res, @Req() req ) {
        try {
            if ( req.session.usuario ) {
                dto.usuario_id = req.session.usuario.id; // pega o id do usuário na seção
                let veiculo = await this.service.salva( dto );

                const msg = `Veículo ${veiculo.modelo} placas ${veiculo.placa} ` +
                    `registrado para ${req.session.usuario.login} `;

                res.status( 201 ).send( msg );
            } else {
                res.status( 401 ).send( `Usuário não autenticado` );
            }

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
}
