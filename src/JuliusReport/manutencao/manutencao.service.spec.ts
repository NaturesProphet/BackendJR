jest.mock( './manutencao.model' );
jest.mock( '../veiculo/veiculo.model' );

import { ManutencaoDto } from './manutencao.dto'
import { ManutencaoService } from './manutencao.service';

let service = new ManutencaoService();

test( 'salva() --> Espera-se que o método salve o registro no banco '
  + 'e retorne o objeto gravado', async () => {

    const manutencao: ManutencaoDto = {
      dataInicio: new Date(),
      dataFinal: new Date(),
      local: 'Oficina do Tião',
      valorMaterial: 100.00,
      valorServico: 80.00,
      descricao: 'Manutencao de teste',
      veiculo_id: 54321
    }

    const manutencaoSalva: Manutencao = await service.salva( manutencao, 12345 );
    expect( manutencaoSalva.id > 0 );
    expect( manutencaoSalva.dataregistro ).not.toBeNull;
    expect( manutencaoSalva.veiculo_id ).toBe( 54321 );
  } );


test( 'salva() --> Espera-se que o método lance um erro ao tentar '
  + 'salvar uma manutencao usando dados inválidos', async () => {

    const manutencao: ManutencaoDto = {
      dataInicio: null,
      dataFinal: new Date(),
      local: 'Oficina do Tião',
      valorMaterial: 100.00,
      valorServico: 80.00,
      descricao: undefined,
      veiculo_id: 54321
    }
    let errorMsg: string;
    let errorCode: number;

    try {
      await service.salva( manutencao, 12345 );
    }
    catch ( err ) {
      errorMsg = err.response.message;
      errorCode = err.response.statusCode;
    }
    expect( errorMsg ).toBe( 'Dados inválidos' );
    expect( errorCode ).toBe( 400 );
  } );



test( 'salva() --> Espera-se que o método lance um erro ao tentar salvar uma manutencao em '
  + 'um veículo que não pertence ao usuário informado', async () => {

    const manutencao: ManutencaoDto = {
      dataInicio: new Date(),
      dataFinal: new Date(),
      local: 'Oficina do Tião',
      valorMaterial: 100.00,
      valorServico: 80.00,
      descricao: 'Manutencao de teste',
      veiculo_id: 1
    }
    let errorMsg: string;
    let errorCode: number;

    try {
      await service.salva( manutencao, 12345 );
    }
    catch ( err ) {
      errorMsg = err.response.message;
      errorCode = err.response.statusCode;
    }
    expect( errorMsg ).toBe( 'O veiculo informado não pertence ao usuário' );
    expect( errorCode ).toBe( 403 );
  } );


test( 'salva() --> Espera-se que o método lance um erro ao tentar salvar uma manutencao em '
  + 'um veículo que não existe no banco de dados', async () => {

    const manutencao: ManutencaoDto = {
      dataInicio: new Date(),
      dataFinal: new Date(),
      local: 'Oficina do Tião',
      valorMaterial: 100.00,
      valorServico: 80.00,
      descricao: 'Manutencao de teste',
      veiculo_id: 0
    }
    let errorMsg: string;
    let errorCode: number;

    try {
      await service.salva( manutencao, 12345 );
    }
    catch ( err ) {
      errorMsg = err.response.message;
      errorCode = err.response.statusCode;
    }
    expect( errorMsg ).toBe( 'O veículo informado não existe' );
    expect( errorCode ).toBe( 400 );
  } );


test( 'getByVeiculo() --> Espera-se que o método retorne uma lista com '
  + 'as manutenções registradas de um Veiculo, validando o usuário proprietário', async () => {
    const manutencoes: Manutencao[] = await service.getByVeiculo( 54321, 12345 );
    expect( manutencoes.length ).toBe( 2 );
  } );


test( 'getByVeiculo() --> Espera-se que o método Lance um erro ao '
  + 'tentar listar as manutencoes registradas de um Veiculo que '
  + 'não pertence ao usuário informado', async () => {
    let errorMsg: string;
    let errorCode: number;
    try {
      const manutencoes: Manutencao[] = await service.getByVeiculo( 1, 12345 );
    }
    catch ( err ) {
      errorMsg = err.response.message;
      errorCode = err.response.statusCode;
    }
    expect( errorMsg ).toBe( 'O veiculo buscado não pertence ao usuário especificado na consulta' );
    expect( errorCode ).toBe( 403 );
  } );
