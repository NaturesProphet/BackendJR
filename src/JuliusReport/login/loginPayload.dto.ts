import { ApiModelProperty } from "@nestjs/swagger";

export class loginPayload {
    /* 
    * Payload de autenticação. 
    */
    @ApiModelProperty()
    public login: string;

    @ApiModelProperty()
    public senha: string
}
