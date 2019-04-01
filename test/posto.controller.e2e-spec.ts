import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { PostoDto } from "../src/JuliusReport/posto/posto.dto";
import { loginPayload } from "../src/JuliusReport/login/loginPayload.dto";
const feature = loadFeature( "./test/features/postos.feature" );

jest.mock( "../src/JuliusReport/posto/posto.model" );
jest.mock( "../src/JuliusReport/julius-report.module" );
jest.mock( "../src/JuliusReport/usuario/usuario.model" );



defineFeature( feature, test => {
    let module: TestingModule;
    let app: INestApplication;

    beforeAll( async () => {
        module = await Test.createTestingModule( {
            imports: [ AppModule ]
        } ).compile();
        app = module.createNestApplication();
        await app.init();
    } );


    test( '1: Os dados informados são válidos', ( { given, and, when, then } ) => {
        let endpoint: string;
        let body;
        let response;
        let token;

        given( 'Quero registrar um novo posto de combustível', () => {
            endpoint = '/posto';
        } );

        and( 'tenho um token válido para me autenticar', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'existente';
            payload.senha = 'test@123***';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );

        when( 'eu enviar os dados de registro', async () => {
            body = new PostoDto();
            body.bandeira = 'BR';
            body.local = 'avenida 7';
            body.nome = 'posto malaquias';
            response = await request( app.getHttpServer() ).post( endpoint )
                .send( body ).set( { authorization: `Bearer ${token}` } );
        } );

        then( 'recebo uma mensagem de confirmação com um código 201 na Resposta', () => {
            expect( response.status ).toBe( 201 );
            expect( response.text ).toMatch( /^Posto (.*) registrado$/ );
        } );
    } );


    test( '2: Os dados informados NÃO são válidos.', ( { given, and, when, then } ) => {
        let endpoint: string;
        let body;
        let response;
        let token;
        given( 'Quero registrar um novo posto de combustível', () => {
            endpoint = '/posto';
        } );

        and( 'tenho um token válido para me autenticar', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'existente';
            payload.senha = 'test@123***';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            expect( token.status ).toBe( 200 );
            token = token.text;
        } );

        and( 'Informei dados inválidos ou nulos', () => {
            body = null;
        } );

        when( 'eu enviar os dados de registro', async () => {
            response = await request( app.getHttpServer() ).post( endpoint )
                .send( body ).set( { authorization: `Bearer ${token}` } );
        } );

        then( 'recebo uma mensagem de erro com um código 400 na Resposta', () => {
            expect( response.status ).toBe( 400 );
            expect( response.text ).toBe( 'Dados invalidos' );
        } );
    } );


    test( '3: O usuário NÃO está autenticado', ( { given, when, then } ) => {
        let endpoint: string;
        let body;
        let response;
        given( 'Quero registrar um novo posto de combustível', () => {
            endpoint = '/posto';
        } );

        when( 'eu enviar os dados de registro', async () => {
            body = new PostoDto();
            body.bandeira = 'BR';
            body.local = 'avenida 7';
            body.nome = 'posto malaquias';
            response = await request( app.getHttpServer() ).post( endpoint )
                .send( body ).set( { authorization: `Bearer 1234` } );;
        } );

        then( 'recebo uma mensagem de erro com um código 401 na Resposta', () => {
            expect( response.status ).toBe( 401 );
            expect( response.text ).toBe( 'Não autenticado' );
        } );
    } );






    afterAll( async () => {
        await app.close();
    } );

} );
