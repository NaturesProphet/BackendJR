import { ApiModelProperty } from "@nestjs/swagger";

export class PostoDto {
    @ApiModelProperty()
    nome: string;

    @ApiModelProperty()
    bandeira: string;

    @ApiModelProperty()
    local: string;
}
