export class DespesaDto {

  tipo: 'imposto' | 'taxa' | 'multa';

  dataPagamento: Date;

  descricao: string;

  valorTotal: number;

  veiculo_id: number;
}
