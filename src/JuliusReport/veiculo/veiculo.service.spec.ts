import { Veiculo } from '../veiculo/veiculo.model';
import { VeiculoService } from './veiculo.service';
import { Usuario } from '../usuario/usuario.model';
import { VeiculoDto } from './veiculo.dto';
jest.mock( '../veiculo/veiculo.model' );
let service = new VeiculoService();



test( 'salva(Veiculo) --> salva e retorna um Veiculo', async () => {
    let veiculo = new VeiculoDto();
    veiculo.cor = 'preto';
    veiculo.marca = 'WolksWagen';
    veiculo.modelo = 'fuscão';
    veiculo.placa = "KGB-6666";
    veiculo.usuario_id = 69;
    veiculo.anoFrabricacao = 1972;
    veiculo.anoModelo = 1973;
    let veiculoSalvo = await service.salva( veiculo );
    expect( veiculoSalvo.id ).toBeGreaterThan( 0 );
} );


test( 'salva(Veiculo) --> lança um erro se a placa já existir', async () => {
    let veiculo = new VeiculoDto();
    veiculo.cor = 'preto';
    veiculo.marca = 'WolksWagen';
    veiculo.modelo = 'fuscão';
    veiculo.usuario_id = 69;
    veiculo.anoFrabricacao = 1972;
    veiculo.anoModelo = 1973;
    veiculo.placa = 'placa existente';
    let Erro: Error;
    try {
        let veiculoSalvo = await service.salva( veiculo );
    } catch ( deuRuim ) {
        Erro = deuRuim;
    }
    expect( Erro.message ).toBe( "Esta placa já existe." );
} );


test( 'salva(Veiculo) --> lança um erro se os dados forem inválidos', async () => {
    let veiculo = new VeiculoDto();
    let Erro: Error;
    try {
        let veiculoSalvo = await service.salva( veiculo );
    } catch ( deuRuim ) {
        Erro = deuRuim;
    }
    expect( Erro.message ).toBe( 'Dados invalidos' );
} );


test( 'getVeiculos --> retorna um array de veículos', async () => {
    let usuario = new Usuario();
    usuario.id = 69;
    usuario.veiculos = [ new Veiculo() ];
    let frota = await service.getVeiculos( usuario );
    expect( frota.length ).toBe( 1 );
} );


test( 'getVeiculos --> lança um erro se o usuário for inválido', async () => {
    let usuario = new Usuario();
    let Erro: Error;
    usuario.veiculos = [ new Veiculo() ];
    try {
        let frota = await service.getVeiculos( usuario );
    } catch ( deuRuimdnv ) {
        Erro = deuRuimdnv
    }
    expect( Erro.message ).toBe( 'Usuário inválido' );
} );
