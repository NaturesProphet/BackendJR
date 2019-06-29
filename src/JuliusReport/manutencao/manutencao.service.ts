import { Injectable, BadRequestException, ForbiddenException } from "@nestjs/common";


import { Veiculo } from "../veiculo/veiculo.model";
import { ManutencaoDto } from "./manutencao.dto";
import { Manutencao } from "./manutencao.model";

@Injectable()
export class ManutencaoService {

  async salva ( manutencao: ManutencaoDto, usuario_id: number ): Promise<Manutencao> {
    let novaManutencao = new Manutencao();
    const veiculo: Veiculo = await Veiculo.findOne( { id: manutencao.veiculo_id } );

    if ( !veiculo ) {
      throw new BadRequestException( 'O veículo informado não existe' );
    }

    if ( veiculo.usuario_id != usuario_id ) {
      throw new ForbiddenException( 'O veiculo informado não pertence ao usuário' );
    }

    if ( manutencao.dataFinal && manutencao.dataInicio && manutencao.local &&
      manutencao.descricao && manutencao.valorMaterial &&
      manutencao.valorServico && manutencao.veiculo_id ) {

      novaManutencao.dataInicio = manutencao.dataInicio;
      novaManutencao.dataFinal = manutencao.dataFinal;
      novaManutencao.descricao = manutencao.descricao;
      novaManutencao.local = manutencao.local;
      novaManutencao.valorMaterial = manutencao.valorMaterial;
      novaManutencao.valorServico = manutencao.valorServico;
      novaManutencao.veiculo_id = manutencao.veiculo_id;

      return await Manutencao.save( novaManutencao );
    }
    else {
      throw new BadRequestException( 'Dados inválidos' );
    }
  }

  async getByVeiculo ( veiculo_id: number, usuario_id: number ): Promise<Manutencao[]> {
    const veiculo: Veiculo = await Veiculo.findOne( { id: veiculo_id } );
    if ( !veiculo ) {
      throw new BadRequestException( 'O veículo informado não existe' );
    }
    if ( veiculo.usuario_id != usuario_id ) {
      throw new ForbiddenException( 'O veiculo buscado não pertence ao usuário especificado na consulta' );
    }
    return await Manutencao.find( { veiculo_id: veiculo_id } );
  }
}
