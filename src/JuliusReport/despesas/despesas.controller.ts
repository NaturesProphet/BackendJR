import { Controller } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { DespesaService } from "./despesas.service";



@ApiUseTags( 'Despesas diversas' )
@Controller( 'despesa' )
export class DespesaController {
  constructor( private readonly service: DespesaService ) { }





}