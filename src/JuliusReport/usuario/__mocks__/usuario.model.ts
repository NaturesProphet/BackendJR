import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Index } from "typeorm";
import { ApiModelProperty } from "@nestjs/swagger";
import * as bcrypt from 'bcryptjs';

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
        if ( obj.login == 'existente' ) {
            usuario.login = 'existente';
            return usuario;
        } else {
            return null;
        }
    }
}
