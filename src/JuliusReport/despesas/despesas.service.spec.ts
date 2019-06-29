import { DespesaService } from './despesas.service';
import { DespesaDto } from './despesas.dto';
import { Despesa } from './despesas.model';

jest.mock( './despesas.model' );
jest.mock( '../veiculo/veiculo.model' );

let service = new DespesaService();

test( 'salva uma despesa', async () => {

  const despesa: DespesaDto = {
    dataPagamento: new Date(),
    descricao: 'Despesa de teste',
    tipo: "taxa",
    valorTotal: 0.01,
    veiculo_id: 1
  }

  const despesaSalva: Despesa = await service.salva( despesa, 1 );
  expect( despesaSalva.id > 0 );
  expect( despesaSalva.dataregistro ).not.toBeNull;
} );


test( 'lança um erro ao tentar salvar uma despesa usando dados inválidos', async () => {

  const despesa: DespesaDto = {
    dataPagamento: null,
    descricao: null,
    tipo: null,
    valorTotal: null,
    veiculo_id: 1
  }
  let errorMsg: string;
  let errorCode: number;

  try {
    await service.salva( despesa, 1 );
  }
  catch ( err ) {
    errorMsg = err.response.message;
    errorCode = err.response.statusCode;
  }
  expect( errorMsg ).toBe( 'Dados inválidos' );
  expect( errorCode ).toBe( 400 );
} );



test( 'lança um erro ao tentar salvar uma despesa em '
  + 'um veículo que não pertence ao usuário informado', async () => {

    const despesa: DespesaDto = {
      dataPagamento: new Date(),
      descricao: 'Despesa de teste',
      tipo: "taxa",
      valorTotal: 0.01,
      veiculo_id: 1
    }
    let errorMsg: string;
    let errorCode: number;

    try {
      await service.salva( despesa, 12345 );
    }
    catch ( err ) {
      errorMsg = err.response.message;
      errorCode = err.response.statusCode;
    }
    expect( errorMsg ).toBe( 'O veiculo informado não pertence ao usuário' );
    expect( errorCode ).toBe( 403 );
  } );


test( 'lança um erro ao tentar salvar uma despesa em '
  + 'um veículo que não existe no banco de dados', async () => {

    const despesa: DespesaDto = {
      dataPagamento: new Date(),
      descricao: 'Despesa de teste',
      tipo: "taxa",
      valorTotal: 0.01,
      veiculo_id: -1
    }
    let errorMsg: string;
    let errorCode: number;

    try {
      await service.salva( despesa, 12345 );
    }
    catch ( err ) {
      errorMsg = err.response.message;
      errorCode = err.response.statusCode;
    }
    expect( errorMsg ).toBe( 'O veículo informado não existe' );
    expect( errorCode ).toBe( 400 );
  } );


test( 'lista as despesas de um Veiculo, validando o usuário proprietário', async () => {
  const despesas: Despesa[] = await service.getByVeiculo( 1, 1 );
  expect( despesas.length ).toBe( 2 );
} );


test( 'Lança um erro ao tentar listar as despesas de um Veiculo que '
  + 'não pertence ao usuário informado', async () => {
    let errorMsg: string;
    let errorCode: number;
    try {
      const despesas: Despesa[] = await service.getByVeiculo( 1, 69 );
    }
    catch ( err ) {
      errorMsg = err.response.message;
      errorCode = err.response.statusCode;
    }
    expect( errorMsg ).toBe( 'O veiculo buscado não pertence ao usuário especificado na consulta' );
    expect( errorCode ).toBe( 403 );
  } );
