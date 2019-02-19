import { BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Index } from "typeorm";
import { ApiModelProperty } from "@nestjs/swagger";
import * as bcrypt from 'bcryptjs';

@Entity()
export class Usuario extends BaseEntity {

    @PrimaryGeneratedColumn()
    @ApiModelProperty()
    id: number;

    @CreateDateColumn()
    @ApiModelProperty()
    dataregistro: Date;

    @UpdateDateColumn()
    @ApiModelProperty()
    atualizadoem: Date;

    @Column()
    @ApiModelProperty()
    nome: string;

    @Column()
    @ApiModelProperty()
    email: string;

    @Column( { nullable: true } )
    @ApiModelProperty()
    telefone: string;

    @Column( { nullable: true } )
    @ApiModelProperty()
    endereco: string;

    @Column()
    @Index( { unique: true } )
    @ApiModelProperty()
    login: string;

    @Column()
    @ApiModelProperty()
    private passwordHash: string;


    /**
     * Método que criptografa a senha do usuário antes de armazena-la no banco
     * @param pass senha bruta a ser criptografada
     */
    public setPassword( pass: string ): string {
        this.passwordHash = bcrypt.hashSync( pass );
        return this.passwordHash;
    }

    /**
     * Este método recupera o hash da senha do usuário
     */
    public getHash(): string {
        return this.passwordHash;
    }
}
