import { Injectable } from '@nestjs/common';
import { Veiculo } from './veiculo.model';
import { Usuario } from 'JuliusReport/usuario/usuario.model';


@Injectable()
export class VeiculoService {

    /**
     * Este método salva um novo veículo no banco
     * @param veiculo 
     * @returns Veiculo salvo
     */
    public async salva ( veiculo: Veiculo ): Promise<Veiculo> {
        if (
            veiculo.usuario_id
            && veiculo.anoFrabricacao
            && veiculo.anoModelo
            && veiculo.cor
            && veiculo.marca
            && veiculo.modelo
        ) {
            return await Veiculo.save( veiculo );
        } else {
            throw new Error( 'Dados invalidos' );
        }
    }

    /**
     * Este método recupera os veículos de um usuário
     * @param usuario proprietário dos veículos
     * @returns array de Veiculos
     */
    public async getVeiculos ( usuario: Usuario ): Promise<Veiculo[]> {
        if ( usuario.id ) {
            return await usuario.getVeiculos();
        } else {
            throw new Error( 'Usuário inválido' );
        }
    }
}
