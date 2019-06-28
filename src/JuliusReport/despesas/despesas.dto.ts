import { ApiModelProperty } from "@nestjs/swagger";

export class DespesaDto {

  @ApiModelProperty()
  tipo: 'imposto' | 'taxa' | 'multa';

  @ApiModelProperty()
  dataPagamento: Date;

  @ApiModelProperty()
  descricao: string;

  @ApiModelProperty()
  valorTotal: number;

  @ApiModelProperty()
  veiculo_id: number;
}
