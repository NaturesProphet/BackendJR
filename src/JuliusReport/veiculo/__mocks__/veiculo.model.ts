import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity, Entity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiModelProperty } from "@nestjs/swagger";
import { Usuario } from "../../../JuliusReport/usuario/usuario.model";

@Entity()
export class Veiculo {

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

    public static save ( veiculo: Veiculo ) {
        veiculo.id = 69;
        veiculo.atualizadoem = new Date();
        veiculo.dataregistro = new Date();
        return veiculo;
    }

    public static find ( options ) {
        if ( options.usuario_id == 69 ) {
            let veiculo = new Veiculo();
            veiculo.cor = 'preto';
            veiculo.marca = 'WolksWagen';
            veiculo.modelo = 'fuscão';
            veiculo.placa = "KGB-6666";
            veiculo.usuario_id = 69;
            veiculo.anoFrabricacao = 1972;
            veiculo.anoModelo = 1973;
            veiculo.id = 69;
            return [ veiculo ];
        } else {
            return [];
        }
    }
}
