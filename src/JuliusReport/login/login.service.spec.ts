import { LoginService } from './login.service';
import { Usuario } from '../usuario/usuario.model';
jest.mock( '../usuario/usuario.model' ); // mocka a consulta que busca o usuário no banco


let service: LoginService = new LoginService();


test( 'login --> espera-se um objeto Usuário caso as credenciais batam', async () => {
    let login: string = 'existente';
    let senha: string = 'test@123***';
    let usuario: Usuario = await service.login( login, senha );
    expect( usuario.id ).toBe( 69 );
} );


test( 'login --> espera-se um erro 401 caso as credenciais não batam', async () => {
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

test( 'login --> espera-se uma mensagem de erro caso o login não exista', async () => {
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