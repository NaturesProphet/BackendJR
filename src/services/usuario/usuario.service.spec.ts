import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../../models/usuario.model';
import { AppError } from '../../common/error/AppError';
import { AppErrorTypeEnum } from '../../common/error/AppErrorTypeEnum';
jest.mock( './usuario.service' );

describe( 'UsuarioService', () => {
    let service: UsuarioService;

    beforeAll( async () => {
        const module: TestingModule = await Test.createTestingModule( {
            providers: [ UsuarioService ],
        } ).compile();
        service = module.get<UsuarioService>( UsuarioService );
    } );


    it( 'cadastraNovoUsuario(pessoa) --> espera-se o retorno de um Usuario',
        async () => {
            let pessoa: Usuario = new Usuario();
            pessoa.email = 'testes@teste.com';
            pessoa.nome = 'Testador';
            pessoa.login = 'test';
            pessoa.passwordHash = 'test@123***';
            pessoa.endereco = 'avenida central 69';
            let retorno = await service.cadastraNovoUsuario( pessoa );
            expect( retorno.id ).toBeGreaterThan( 0 ); //testa se o id foi gerado
            expect( retorno.login.length ).toBeGreaterThan( 2 ); // testa se o login foi gerado
            expect( retorno.passwordHash.length ).toBe( 60 ); // testa se a senha veio criptografada
            expect( retorno.nome.length ).toBeGreaterThan( 2 ); // testa se o campo nome está preenchido
        } );

    it( 'cadastraNovoUsuario(pessoa) --> espera-se um erro em caso de o usuário já existir',
        async () => {
            let pessoa: Usuario = new Usuario();
            pessoa.email = 'testes@teste.com';
            pessoa.nome = 'existente';
            pessoa.login = 'existente';
            pessoa.passwordHash = 'test@123***';
            pessoa.endereco = 'avenida central 69';
            // expect( await service.cadastraNovoUsuario( pessoa ) ).toThrowError;
        } );
} );
