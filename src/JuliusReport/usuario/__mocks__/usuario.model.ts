import * as bcrypt from 'bcryptjs';
import { Veiculo } from "../../../JuliusReport/veiculo/veiculo.model";

export class Usuario {

    id: number;

    dataregistro: Date;

    atualizadoem: Date;

    nome: string;

    email: string;

    telefone: string;

    endereco: string;

    login: string;

    private passwordHash: string;

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
        if ( this.login == 'existente1' ) {
            let carro: Veiculo = new Veiculo();
            carro.anoFrabricacao = 1973;
            carro.anoModelo = 1973;
            carro.cor = 'preto';
            carro.dataregistro = new Date();
            carro.id = 69;
            carro.marca = 'WolksWagen';
            carro.modelo = "Fuscão";
            carro.observacoes = "Carro de corrida";
            carro.placa = "KKK 6969";
            carro.usuario_id = 69;
            this.veiculos = [ carro ];
            return this.veiculos;
        }
        return this.veiculos;
    }
}
