import { LoginService } from './login.service';
import { Usuario } from '../usuario/usuario.model';
jest.mock( '../usuario/usuario.model' ); // mocka a consulta que busca o usuário no banco


let service: LoginService = new LoginService();


test( 'login --> retorna um Usuário com veículo default caso as credenciais batam', async () => {
    let login: string = 'existente1';
    let senha: string = 'test@123***';
    let usuario: Usuario = await service.login( login, senha );
    expect( usuario.id ).toBe( 69 );
    expect( usuario.veiculos.length ).toBeGreaterThan( 0 );
    expect( usuario.veiculoDefault ).not.toBeNull();
} );

test( 'login --> retorna um Usuário sem veículo default caso as credenciais batam', async () => {
    let login: string = 'existente';
    let senha: string = 'test@123***';
    let usuario: Usuario = await service.login( login, senha );
    expect( usuario.id ).toBe( 69 );
    expect( usuario.veiculos.length ).toBe( 0 );
    expect( usuario.veiculoDefault ).toBeNull();
} );


test( 'login --> lança um erro 401 caso as credenciais não batam', async () => {
    let login: string = 'existente';
    let senha: string = '654321';
    let erro;
    try {
        let usuario: Usuario = await service.login( login, senha );
    } catch ( abacaxi ) {
        erro = abacaxi;
    }
    expect( erro.status ).toBe( 401 );

} );

test( 'login --> lança um erro caso o login não exista', async () => {
    let login: string = 'QuemSouEu?';
    let senha: string = 'senhagrandepracaramba';
    let erro;
    try {
        let usuario: Usuario = await service.login( login, senha );
    } catch ( abacaxi ) {
        erro = abacaxi;
    }
    expect( erro.message ).toBe( 'O login informado não foi encontrado' );
} );
