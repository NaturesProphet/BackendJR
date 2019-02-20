import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.model';
import { UsuarioDto } from './usuario.dto';
jest.mock( './usuario.service' );

let service = new UsuarioService();

test( 'cadastraNovoUsuario(pessoa) --> espera-se o retorno de um Usuario', async () => {
    let pessoa: UsuarioDto = {
        email: 'usuario@servidor.dominio',
        nome: 'Testador',
        login: 'test',
        senha: 'test@123***',
        endereco: 'avenida central 69',
        telefone: '9999 9999'
    };
    let retorno: Usuario;
    try {
        retorno = await service.cadastraNovoUsuario( pessoa );
    } catch ( e ) {
        console.log( e )
    }
    expect( retorno.id ).toBeGreaterThan( 0 ); //testa se o id foi gerado
    expect( retorno.login.length ).toBeGreaterThan( 2 ); // testa se o login foi gerado
    expect( retorno.getHash().length ).toBe( 60 ); // testa se a senha veio criptografada
    expect( retorno.nome.length ).toBeGreaterThan( 2 ); // testa se o campo nome está preenchido
} );


test( 'cadastraNovoUsuario(pessoa) --> espera-se um erro em caso de o usuário já existir', async () => {
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


test( 'cadastraNovoUsuario(pessoa) --> espera-se um erro em caso de dados inválidos', async () => {
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

