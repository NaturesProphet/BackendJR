export class Manutencao {
  id: number;
  dataregistro: Date;
  atualizadoem: Date;
  local: string
  valorMaterial: number;
  valorServico: number;
  descricao: string;
  dataInicio: Date;
  dataFinal: Date;
  veiculo_id: number;

  public static async save ( manutencao: Manutencao ): Promise<Manutencao> {
    manutencao.atualizadoem = new Date();
    manutencao.dataregistro = new Date();
    manutencao.id = 1;
    return manutencao;
  }

  public static async find ( options: any ): Promise<Manutencao[]> {
    if ( options.veiculo_id == 54321 ) {
      let manutencao1 = new Manutencao();
      let manutencao2 = new Manutencao();
      manutencao1.veiculo_id = 54321;
      manutencao2.veiculo_id = 54321;
      return [ manutencao1, manutencao2 ]
    }
    else {
      return [];
    }
  }

  public static async findOne ( options: any ): Promise<Manutencao> {
    let manutencao = new Manutencao();
    manutencao.atualizadoem = new Date();
    manutencao.dataregistro = new Date();
    manutencao.descricao = 'Manutencao de teste';
    manutencao.id = 1;
    manutencao.veiculo_id = 1;
    manutencao.dataInicio = new Date();
    manutencao.dataFinal = new Date();
    manutencao.valorMaterial = 100.0;
    manutencao.valorServico = 80.00;
    manutencao.local = 'Oficina do Tião lanterneiro';

    if ( options.veiculo_id == 1 ) {
      return manutencao;
    }
    else if ( options.veiculo_id == 2 ) {
      manutencao.veiculo_id = 2;
      return manutencao;
    }
  }

}
