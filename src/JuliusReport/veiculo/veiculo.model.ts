import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity, Entity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiModelProperty } from "@nestjs/swagger";
import { Usuario } from "../../JuliusReport/usuario/usuario.model";

@Entity()
export class Veiculo extends BaseEntity {

    @PrimaryGeneratedColumn()
    @ApiModelProperty()
    id: number;

    @CreateDateColumn()
    @ApiModelProperty()
    dataregistro: Date;

    @UpdateDateColumn()
    @ApiModelProperty()
    atualizadoem: Date;

    @Column( { unique: true } )
    placa: string;

    @Column()
    cor: string;

    @Column()
    marca: string;

    @Column()
    modelo: string;

    @Column( 'int' )
    anoFrabricacao: number;

    @Column( 'int' )
    anoModelo: number;

    @Column( { nullable: true } )
    observacoes: string;

    @ManyToOne( type => Usuario, { nullable: false } )
    @JoinColumn( { name: "usuario_id" } )
    @ApiModelProperty()
    usuario_id: number;


}
