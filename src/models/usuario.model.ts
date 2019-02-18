import { BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Index } from "typeorm";
import { ApiModelProperty } from "@nestjs/swagger";

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
    passwordHash: string;

}
