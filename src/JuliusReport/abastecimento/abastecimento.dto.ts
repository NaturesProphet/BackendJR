import { ApiModelProperty } from "@nestjs/swagger";

export class AbastecimentoDto {
  @ApiModelProperty()
  valorTotal: number;

  @ApiModelProperty()
  valorLitro: number;

  @ApiModelProperty( { enum: [ 'Gasolina comum', 'Gasolina aditivada', 'Gasolina premium', 'Alcool' ] } )
  combustivel: 'Gasolina comum' | 'Gasolina aditivada' | 'Gasolina premium' | 'Alcool';

  @ApiModelProperty()
  data: Date;

  @ApiModelProperty()
  km: number

  @ApiModelProperty()
  veiculo_id: number;

  @ApiModelProperty()
  posto_id: number;

  @ApiModelProperty( { enum: [ 'Ligado sempre', 'Uso moderado', 'Pouco uso', 'Desligado' ], required: false } )
  ar: 'Ligado sempre' | 'Uso moderado' | 'Pouco uso' | 'Desligado'

  @ApiModelProperty( {
    enum: [ 'Estrada - planicie', 'Estrada - montanha',
      'Cidade - transito ruim', 'Cidade - trânsito normal' ],
    required: false
  } )
  trajeto: 'Estrada - planicie' | 'Estrada - montanha'
    | 'Cidade - transito ruim' | 'Cidade - trânsito normal';

  @ApiModelProperty( { required: false } )
  ocupantes: number
}
