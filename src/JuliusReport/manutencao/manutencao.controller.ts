import { Controller, Post, Body, Res, Req, Get, Param } from "@nestjs/common";
import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiImplicitParam } from "@nestjs/swagger";
import { ManutencaoService } from "./manutencao.service";
import { ManutencaoDto } from "./manutencao.dto";
import { LoginService } from "../login/login.service";
import { Manutencao } from "./manutencao.model";


@ApiUseTags( 'Manutenção' )
@Controller( 'manutencao' )
export class ManutencaoController {
  constructor( private readonly service: ManutencaoService ) { }

  @ApiBearerAuth()
  @Post()
  @ApiOperation( { title: 'Registro de Manutenções' } )
  @ApiResponse( {
    status: 201,
    description: 'O registro foi processado com sucesso',
  } )
  @ApiResponse( {
    status: 400,
    description: 'Os dados enviados não são válidos',
  } )
  @ApiResponse( {
    status: 401,
    description: 'Usuário não autenticado',
  } )
  public async salvar ( @Body() dto: ManutencaoDto, @Res() res, @Req() req, ) {

    let userData = await LoginService.getAuthentication( req.headers[ 'authorization' ] );
    await this.service.salva( dto, userData.usuario.id );
    res.status( 201 ).send( 'Manutenção registrada' );

  }

  @ApiBearerAuth()
  @ApiImplicitParam( {
    name: 'veiculo_id',
    description: 'ID do veículo no banco',
    required: true,
    type: 'number'
  } )

  @Get( '/veiculo/:veiculo_id' )
  @ApiOperation( { title: 'Listar manutenções de um veículo específico' } )
  @ApiResponse( {
    status: 200,
    description: 'A busca foi feita sem erros',
  } )
  @ApiResponse( {
    status: 401,
    description: 'Usuário não autenticado',
  } )

  public async listar ( @Res() res, @Req() req, @Param( 'veiculo_id' ) veiculo_id ) {

    let userData = await LoginService.getAuthentication( req.headers[ 'authorization' ] );
    let manutencoes: Manutencao[] = await this.service.getByVeiculo( veiculo_id, userData.usuario.id );
    res.status( 200 ).send( manutencoes );
  }
}
