import { Usuario } from "./usuario.model";

let admin = new Usuario();

test( 'setPassword() --> criptografa a senha crua do usuário', () => {
    let senha = '123';
    expect( admin.setPassword( senha ).length ).toBe( 60 ); // a senha
} );


test( 'getHash() --> retorna o hash da senha do usuário', () => {
    let senha = '123';
    expect( admin.getHash().length ).toBe( 60 ); // a senha
} );
