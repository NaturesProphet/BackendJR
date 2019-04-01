import { LoginService } from './login.service';
import { Usuario } from '../usuario/usuario.model';
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from "../../../src/app.module";
import { loginPayload } from './loginPayload.dto';

jest.mock( '../usuario/usuario.model' ); // mocka a consulta que busca o usuário no banco
jest.mock( '../julius-report.module' );


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


test( 'getAuthentication --> retorna dados da seção autenticada', async () => {

    let module: TestingModule;
    let app: INestApplication;
    module = await Test.createTestingModule( {
        imports: [ AppModule ]
    } ).compile();
    app = module.createNestApplication();
    await app.init();
    let payload: loginPayload = new loginPayload();
    payload.login = 'existente';
    payload.senha = 'test@123***';
    let tokenRequest = await request( app.getHttpServer() ).post( '/login' ).send( payload );
    let token = tokenRequest.text;
    let authorizedData = await LoginService.getAuthentication( token );
    await app.close();
    expect( authorizedData.usuario.nome ).toBe( 'mock jr' )
} );

test( 'getAuthentication --> retorna dados da seção autenticada com BearerAuth', async () => {

    let module: TestingModule;
    let app: INestApplication;
    module = await Test.createTestingModule( {
        imports: [ AppModule ]
    } ).compile();
    app = module.createNestApplication();
    await app.init();
    let payload: loginPayload = new loginPayload();
    payload.login = 'existente';
    payload.senha = 'test@123***';
    let tokenRequest = await request( app.getHttpServer() ).post( '/login' ).send( payload );
    let token = 'Bearer ' + tokenRequest.text;
    let authorizedData = await LoginService.getAuthentication( token );
    await app.close();
    expect( authorizedData.usuario.nome ).toBe( 'mock jr' )
} );



test( 'getAuthentication --> lança um erro se as credenciais não baterem', async () => {
    let token = undefined;
    let errorMsg;
    try {
        await LoginService.getAuthentication( token );
    } catch ( erro ) {
        errorMsg = erro.message;
    }
    expect( errorMsg.message ).toBe( "Não autenticado" );

} );