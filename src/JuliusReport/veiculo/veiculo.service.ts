import { Injectable } from '@nestjs/common';
import { Veiculo } from './veiculo.model';
import { Usuario } from 'JuliusReport/usuario/usuario.model';
import { VeiculoDto } from './veiculo.dto';


@Injectable()
export class VeiculoService {

    /**
     * Este método salva um novo veículo no banco
     * @param veiculo 
     * @returns Veiculo salvo
     */
    public async salva ( veiculo: VeiculoDto ): Promise<Veiculo> {
        if (
            veiculo.usuario_id
            && veiculo.anoFrabricacao
            && veiculo.anoModelo
            && veiculo.cor
            && veiculo.marca
            && veiculo.modelo
            && veiculo.placa
        ) {
            let novo = new Veiculo();
            novo.usuario_id = veiculo.usuario_id;
            novo.anoFrabricacao = veiculo.anoFrabricacao;
            novo.anoModelo = veiculo.anoModelo;
            novo.cor = veiculo.cor;
            novo.marca = veiculo.marca;
            novo.modelo = veiculo.modelo;
            novo.placa = veiculo.placa

            let teste = await Veiculo.find( { placa: veiculo.placa } );
            if ( teste.length == 0 ) {
                if ( veiculo.observacoes ) {
                    novo.observacoes = veiculo.observacoes;
                }
                return await Veiculo.save( novo );
            } else {
                throw new Error( "Esta placa já existe." );
            }
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
