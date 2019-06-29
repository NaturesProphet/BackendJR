import { Injectable, BadRequestException, ForbiddenException } from "@nestjs/common";
import { DespesaDto } from "./despesas.dto";
import { Despesa } from './despesas.model'
import { Veiculo } from "../veiculo/veiculo.model";

@Injectable()
export class DespesaService {

  async salva ( despesa: DespesaDto, usuario_id: number ): Promise<Despesa> {
    let novaDespesa = new Despesa();
    const veiculo: Veiculo = await Veiculo.findOne( { id: despesa.veiculo_id } );

    if ( !veiculo ) {
      throw new BadRequestException( 'O veículo informado não existe' );
    }

    if ( veiculo.usuario_id != usuario_id ) {
      throw new ForbiddenException( 'O veiculo informado não pertence ao usuário' );
    }

    if ( despesa.dataPagamento &&
      despesa.descricao &&
      despesa.tipo &&
      despesa.valorTotal &&
      despesa.veiculo_id ) {

      novaDespesa.dataPagamento = despesa.dataPagamento;
      novaDespesa.descricao = despesa.descricao;
      novaDespesa.tipo = despesa.tipo;
      novaDespesa.valorTotal = despesa.valorTotal;
      novaDespesa.veiculo_id = despesa.veiculo_id;
      return await Despesa.save( novaDespesa );
    }
    else {
      throw new BadRequestException( 'Dados inválidos' );
    }
  }

  async getByVeiculo ( veiculo_id: number, usuario_id: number ): Promise<Despesa[]> {
    const veiculo: Veiculo = await Veiculo.findOne( { id: veiculo_id } );
    if ( !veiculo ) {
      throw new BadRequestException( 'O veículo informado não existe' );
    }
    if ( veiculo.usuario_id != usuario_id ) {
      throw new ForbiddenException( 'O veiculo buscado não pertence ao usuário especificado na consulta' );
    }
    return await Despesa.find( { veiculo_id: veiculo_id } );
  }
}
