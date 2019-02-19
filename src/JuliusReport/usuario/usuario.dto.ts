import { ApiModelProperty } from "@nestjs/swagger";

/**
 * Classe intermediária para inserção de novos usuários ao sistema
*/

export class UsuarioDto {
    @ApiModelProperty()
    nome: string;

    @ApiModelProperty()
    email: string;

    @ApiModelProperty()
    telefone: string;

    @ApiModelProperty()
    endereco: string;

    @ApiModelProperty()
    login: string;

    @ApiModelProperty()
    senha: string;
}
