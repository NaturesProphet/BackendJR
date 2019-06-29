import { ApiModelProperty } from "@nestjs/swagger";

export class ManutencaoDto {

  @ApiModelProperty()
  local: string

  @ApiModelProperty()
  valorMaterial: number;

  @ApiModelProperty()
  valorServico: number;

  @ApiModelProperty()
  descricao: string;

  @ApiModelProperty()
  dataInicio: Date;

  @ApiModelProperty()
  dataFinal: Date;

  @ApiModelProperty()
  veiculo_id: number;
}
