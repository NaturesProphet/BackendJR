export class Despesa {

  id: number;

  dataregistro: Date;

  atualizadoem: Date;

  tipo: 'imposto' | 'taxa' | 'multa';

  dataPagamento: Date;

  descricao: string;

  valorTotal: number;

  veiculo_id: number;

  public static async save ( despesa: Despesa ): Promise<Despesa> {
    despesa.atualizadoem = new Date();
    despesa.dataregistro = new Date();
    despesa.id = 1;
    return despesa;
  }


  public static find ( options ) {
    if ( options.veiculo_id == 1 || options.veiculo_id == 54321 ) {
      return [ new Despesa(), new Despesa() ]
    } else {
      return [];
    }
  }


  // mocka a consulta ao banco de dados
  public static async findOne ( obj: any ) {
    let despesa = new Despesa();
    despesa.atualizadoem = new Date();
    despesa.dataPagamento = new Date();
    despesa.dataregistro = new Date();
    despesa.descricao = 'multa de rotativo me assaltando';
    despesa.id = 1;
    despesa.tipo = 'multa';
    despesa.valorTotal = 150.00;
    despesa.veiculo_id = 1;

    if ( obj.veiculo_id == 1 ) {
      return despesa;
    }
    else if ( obj.veiculo_id == 2 ) {
      despesa.veiculo_id = 2;
      return despesa;
    }
  }


}
