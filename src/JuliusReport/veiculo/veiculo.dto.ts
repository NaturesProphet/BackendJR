import { ApiModelProperty } from "@nestjs/swagger";

export class VeiculoDto {
    @ApiModelProperty()
    placa: string;

    @ApiModelProperty()
    cor: string;

    @ApiModelProperty()
    marca: string;

    @ApiModelProperty()
    modelo: string;

    @ApiModelProperty()
    anoFrabricacao: number;

    @ApiModelProperty()
    anoModelo: number;

    @ApiModelProperty( { required: false } )
    observacoes: string;

    usuario_id: number;
}
