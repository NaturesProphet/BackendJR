import { Usuario } from "./usuario.model";

let admin = new Usuario();

test( 'setPassword()', () => {
    let senha = '123';
    expect( admin.setPassword( senha ).length ).toBe( 60 ); // a senha
} );


test( 'getHash()', () => {
    let senha = '123';
    expect( admin.getHash().length ).toBe( 60 ); // a senha
} );
