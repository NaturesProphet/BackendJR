import { BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Index, OneToMany } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Veiculo } from "../../JuliusReport/veiculo/veiculo.model";

@Entity()
export class Usuario extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    dataregistro: Date;

    @UpdateDateColumn()
    atualizadoem: Date;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column( { nullable: true } )
    telefone: string;

    @Column( { nullable: true } )
    endereco: string;

    @Column()
    @Index( { unique: true } )
    login: string;

    @Column()
    private passwordHash: string;

    @OneToMany( type => Veiculo, veiculos => Veiculo )
    veiculos: Veiculo[];

    veiculoDefault: Veiculo; // campo que recebe o veículo na seção. Só existe em tempo de execução


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

    /**
     * Este método faz uma busca no banco e retorna todos os veículos pertencentes
     * ao usuário informado.
     * @returns array com os veículos do usuário
     */
    public async getVeiculos (): Promise<Veiculo[]> {
        return await Veiculo.find( { usuario_id: this.id } );
    }
}
