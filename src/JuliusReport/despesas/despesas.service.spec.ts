import { DespesaService } from './despesas.service';
import { DespesaDto } from './despesas.dto';
import { Despesa } from './despesas.model';

let service = new DespesaService();



test( 'salva uma despesa', async () => {

  const despesa: DespesaDto = {
    dataPagamento: new Date(),
    descricao: 'Despesa de teste',
    tipo: "taxa",
    valorTotal: 0.01,
    veiculo_id: 1
  }

  const despesaSalva: Despesa = await service.salva( despesa );
  expect( despesaSalva.id > 0 );
  expect( despesaSalva.dataregistro ).not.toBeNull;
} );



test( 'lança um erro ao tentar salvar uma despesa usando dados inválidos', async () => {

  const despesa: DespesaDto = {
    dataPagamento: null,
    descricao: null,
    tipo: null,
    valorTotal: null,
    veiculo_id: null
  }
  let errorMsg: string;

  try {
    await service.salva( despesa );
  }
  catch ( err ) {
    errorMsg = err.message;
  }
  expect( errorMsg ).toBe( 'Dados invalidos' );
} );


test( 'lista as despesas de um Veiculo, validando o usuário proprietário', async () => {
  const despesas: Despesa[] = await service.getByVeiculo( 1, 1 );
  expect( despesas.length > 0 );
} );


test( 'Lança um erro ao tentar listar as despesas de um Veiculo que '
  + 'não pertence ao usuário informado', async () => {
    let errorMsg: string;
    try {
      const despesas: Despesa[] = await service.getByVeiculo( 1, 0 );
    }
    catch ( err ) {
      errorMsg = err.message;
    }
    expect( errorMsg ).toBe( 'O veiculo buscado não pertence ao usuário especificado na consulta' );
  } );
