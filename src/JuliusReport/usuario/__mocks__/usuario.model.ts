import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Index, OneToMany } from "typeorm";
import { ApiModelProperty } from "@nestjs/swagger";
import * as bcrypt from 'bcryptjs';
import { Veiculo } from "../../../JuliusReport/veiculo/veiculo.model";

@Entity()
export class Usuario {

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

    @OneToMany( type => Veiculo, veiculos => Veiculo )
    veiculos: Veiculo[];

    veiculoDefault: Veiculo; // campo que recebe o veículo na seção


    /**
     * Método que criptografa a senha do usuário antes de armazena-la no banco
     * @param pass senha bruta a ser criptografada
     */
    public setPassword ( pass: string ): string {
        this.passwordHash = bcrypt.hashSync( pass );
        return this.passwordHash;
    }

    /**
     * Este método recupera o hash da senha do usuário
     */
    public getHash (): string {
        return this.passwordHash;
    }

    public static async save ( user: Usuario ): Promise<Usuario> {
        user.id = 69;
        user.dataregistro = new Date();
        user.atualizadoem = new Date();
        return user;
    }


    // mocka a consulta ao banco de dados
    public static async findOne ( obj: any ) {
        let usuario = new Usuario();
        usuario.setPassword( 'test@123***' );
        usuario.id = 69;
        usuario.nome = 'mock jr';
        usuario.login = 'existente';
        usuario.telefone = '007 007';
        usuario.endereco = 'rua 47 esquina com 71'
        usuario.veiculos = []
        if ( obj.login == 'existente' ) {
            return usuario;
        } else if ( obj.login == 'existente1' ) {
            usuario.login = 'existente1';
            let veiculo1 = new Veiculo();
            veiculo1.id = 1;
            usuario.veiculos.push( veiculo1 );
            return usuario;
        } else if ( obj.login == 'existente2' ) {
            usuario.login = 'existente2';
            let veiculo1 = new Veiculo();
            veiculo1.id = 1;
            let veiculo2 = new Veiculo();
            veiculo1.id = 2;
            usuario.veiculos.push( veiculo1 );
            usuario.veiculos.push( veiculo2 );
            return usuario;
        }
    }


    // mocka a consulta ao banco de dados
    public async getVeiculos (): Promise<Veiculo[]> {
        return this.veiculos;
    }
}
