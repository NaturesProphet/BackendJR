import { Controller, Post, Body, Res, Req } from "@nestjs/common";
import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { DespesaService } from "./despesas.service";
import { DespesaDto } from "./despesas.dto";
import { LoginService } from "../login/login.service";



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






















}