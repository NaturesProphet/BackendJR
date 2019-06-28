import { Injectable } from "@nestjs/common";
import { DespesaDto } from "./despesas.dto";
import { Despesa } from './despesas.model'



@Injectable()
export class DespesaService {

  async salva ( despesa: DespesaDto ): Promise<Despesa> {
    return null;
  }

  async getByVeiculo ( veiculo_id: number, usuario_id: number ): Promise<Despesa[]> {
    return [];
  }

}