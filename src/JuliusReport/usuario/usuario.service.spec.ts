import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.model';
import { UsuarioDto } from './usuario.dto';
import { Veiculo } from '../veiculo/veiculo.model';
jest.mock( './usuario.model' );

let service = new UsuarioService();

test( 'cadastraNovoUsuario(pessoa) --> retorna um Usuario', async () => {
    let pessoa: UsuarioDto = {
        email: 'usuario@servidor.dominio',
        nome: 'Testador',
        login: 'test',
        senha: 'test@123***',
        endereco: 'avenida central 69',
        telefone: '9999 9999'
    };
    let retorno = await service.cadastraNovoUsuario( pessoa );
    expect( retorno.id ).toBeGreaterThan( 0 ); //testa se o id foi gerado
    expect( retorno.login ).toBe( 'test' ); // testa se o login foi gerado
    expect( retorno.getHash().length ).toBe( 60 ); // testa se a senha veio criptografada
    expect( retorno.nome ).toBe( 'Testador' );
    expect( retorno.telefone ).toBe( '9999 9999' );
    expect( retorno.endereco ).toBe( 'avenida central 69' );
} );


test( 'cadastraNovoUsuario(pessoa) --> lança um erro em caso de o usuário já existir', async () => {
    let pessoa: UsuarioDto = {
        email: 'testes@teste.com',
        nome: 'Testador',
        login: 'existente',
        senha: 'test@123***',
        endereco: 'avenida central 69',
        telefone: '9999 9999'
    };
    let erro: Error;
    try {
        let retorno = await service.cadastraNovoUsuario( pessoa );
    } catch ( e ) { erro = e; }
    expect( erro.message ).toBe( "Este nome de usuário já existe em nossos registros. Tente outro." );
} );


test( 'cadastraNovoUsuario(pessoa) --> lança um erro em caso de dados inválidos', async () => {
    let pessoa: UsuarioDto = {
        email: 'meuEmailNaoTemArrobaNemPontos',
        nome: 'Testador',
        login: 'test',
        senha: 'test@123***',
        endereco: 'avenida central 69',
        telefone: '9999 9999'
    };
    let erro: Error;
    try {
        let retorno = await service.cadastraNovoUsuario( pessoa );
    } catch ( e ) { erro = e; }
    expect( erro.message ).toBe( "Os dados informados são inválidos, verifique e tente novamente" );
} );

test( 'getOne(login) --> retorna um Usuário caso o login exista', async () => {
    let login = 'existente';
    let usuario: Usuario = await UsuarioService.getOne( login );
    expect( usuario.id ).toBe( 69 );
} );


test( 'getVeiculos --> retorna um array de veículos do usuário', async () => {
    let usuario: Usuario = new Usuario();
    usuario.id = 69;
    usuario.veiculos = [ new Veiculo(), new Veiculo() ];
    let lista = await service.getVeiculos( usuario );
    expect( lista.length ).toBe( 2 );
} );

