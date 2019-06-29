import { Controller, Post, Body, Res, Req, Get, Param } from "@nestjs/common";
import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiImplicitParam } from "@nestjs/swagger";
import { DespesaService } from "./despesas.service";
import { DespesaDto } from "./despesas.dto";
import { LoginService } from "../login/login.service";
import { Despesa } from "./despesas.model";



@ApiUseTags( 'Despesas diversas' )
@Controller( 'despesa' )
export class DespesaController {
  constructor( private readonly service: DespesaService ) { }

  @ApiBearerAuth()
  @Post()
  @ApiOperation( { title: 'Cadastro de despesas diversas' } )
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
  public async salvar ( @Body() dto: DespesaDto, @Res() res, @Req() req, ) {

    let userData = await LoginService.getAuthentication( req.headers[ 'authorization' ] );
    await this.service.salva( dto, userData.usuario.id );
    res.status( 201 ).send( 'Despesa registrada' );

  }

  @ApiBearerAuth()
  @ApiImplicitParam( {
    name: 'veiculo_id',
    description: 'ID do veículo no banco',
    required: true,
    type: 'number'
  } )

  @Get( '/veiculo/:veiculo_id' )
  @ApiOperation( { title: 'Listar despesas de um veículo específico' } )
  @ApiResponse( {
    status: 200,
    description: 'A busca foi feita sem erros',
  } )
  @ApiResponse( {
    status: 401,
    description: 'Usuário não autenticado',
  } )

  public async listarPostos ( @Res() res, @Req() req, @Param( 'veiculo_id' ) veiculo_id ) {

    let userData = await LoginService.getAuthentication( req.headers[ 'authorization' ] );
    let despesas: Despesa[] = await this.service.getByVeiculo( veiculo_id, userData.usuario.id );
    res.status( 200 ).send( despesas );
  }
}

