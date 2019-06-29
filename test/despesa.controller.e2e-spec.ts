import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { loginPayload } from "../src/JuliusReport/login/loginPayload.dto";
const feature = loadFeature( "./test/features/despesas.feature" );

jest.mock( "../src/JuliusReport/despesas/despesas.model" );
jest.mock( "../src/JuliusReport/julius-report.module" );
jest.mock( "../src/JuliusReport/usuario/usuario.model" );
jest.mock( "../src/JuliusReport/veiculo/veiculo.model" );



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
        let body: any;
        let response: any;
        let token: any;
        given( 'Quero registrar uma nova despesa do meu veículo', () => {
            endpoint = '/despesa';
        } );

        and( 'possuo um token de acesso válido', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'donoDaFrota123';
            payload.senha = 'test@123***';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );

        when( 'eu enviar os dados de registro', async () => {
            body = {
                dataPagamento: new Date(),
                descricao: 'despesa de teste',
                tipo: 'taxa',
                valorTotal: 0.01,
                veiculo_id: 54321
            }
            response = await request( app.getHttpServer() ).post( endpoint )
                .send( body ).set( { authorization: `Bearer ${token}` } );
        } );

        then( 'recebo uma mensagem de confirmação com um código 201 na Resposta', () => {
            expect( response.status ).toBe( 201 );
            expect( response.text ).toBe( 'Despesa registrada' );
        } );
    } );



    test( '2: Os dados informados NÃO são válidos.', ( { given, and, when, then } ) => {
        let endpoint: string;
        let body: any;
        let response: any;
        let token: any;
        given( 'Quero registrar uma nova despesa do meu veículo', () => {
            endpoint = '/despesa';
        } );

        and( 'possuo um token de acesso válido', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'donoDaFrota123';
            payload.senha = 'test@123***';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );

        and( 'Digitei algum valor inválido no cadastro', () => {
            body = {
                dataPagamento: null,
                descricao: 'despesa de teste',
                tipo: 'taxa',
                valorTotal: null,
                veiculo_id: 54321
            }
        } );

        when( 'eu enviar os dados de registro', async () => {
            response = await request( app.getHttpServer() ).post( endpoint )
                .send( body ).set( { authorization: `Bearer ${token}` } );
        } );

        then( 'recebo uma mensagem de erro com um código 400 na Resposta', () => {
            expect( response.status ).toBe( 400 );
            expect( response.body.message ).toBe( 'Dados inválidos' );
        } );
    } );



    test( '3: O veículo informado não pertence ao usuário autenticado.', ( { given, and, when, then } ) => {
        let endpoint: string;
        let body: any;
        let response: any;
        let token: any;
        given( 'Quero registrar uma nova despesa de um veículo', () => {
            endpoint = '/despesa';
        } );

        and( 'possuo um token de acesso válido', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'donoDaFrota123';
            payload.senha = 'test@123***';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );

        and( 'este veículo não me pertence', () => {
            body = {
                dataPagamento: new Date(),
                descricao: 'despesa de teste',
                tipo: 'taxa',
                valorTotal: 0.01,
                veiculo_id: 1
            }
        } );

        when( 'eu enviar os dados de registro', async () => {
            response = await request( app.getHttpServer() ).post( endpoint )
                .send( body ).set( { authorization: `Bearer ${token}` } );
        } );

        then( 'recebo uma mensagem de erro com um código 403 na Resposta', () => {
            expect( response.status ).toBe( 403 );
            expect( response.body.message ).toBe( 'O veiculo informado não pertence ao usuário' );
        } );
    } );


    test( '4: O veículo informado não existe', ( { given, and, when, then } ) => {
        let endpoint: string;
        let body: any;
        let response: any;
        let token: any;
        given( 'Quero registrar uma nova despesa de um veículo', () => {
            endpoint = '/despesa';
        } );

        and( 'possuo um token de acesso válido', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'donoDaFrota123';
            payload.senha = 'test@123***';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );

        and( 'este veículo não foi encontrado no banco de dados', () => {
            body = {
                dataPagamento: new Date(),
                descricao: 'despesa de teste',
                tipo: 'taxa',
                valorTotal: 0.01,
                veiculo_id: -1
            }
        } );

        when( 'eu enviar os dados de registro', async () => {
            response = await request( app.getHttpServer() ).post( endpoint )
                .send( body ).set( { authorization: `Bearer ${token}` } );
        } );

        then( 'recebo uma mensagem de erro com um código 400 na Resposta', () => {
            expect( response.status ).toBe( 400 );
            expect( response.body.message ).toBe( 'O veículo informado não existe' );
        } );
    } );



    test( '5: O usuário NÃO está autenticado', ( { given, and, when, then } ) => {
        let endpoint: string;
        let body: any;
        let response: any;
        let token: any;
        given( 'Quero registrar uma nova despesa do meu veículo', () => {
            endpoint = '/despesa';
        } );

        and( 'não possuo um token de acesso válido', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'WindowsEstavel';
            payload.senha = 'muitoprovavel';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );

        when( 'eu enviar os dados de registro', async () => {
            body = {
                dataPagamento: new Date(),
                descricao: 'despesa de teste',
                tipo: 'taxa',
                valorTotal: 0.01,
                veiculo_id: 1
            }
            response = await request( app.getHttpServer() ).post( endpoint )
                .send( body ).set( { authorization: `Bearer ${token}` } );
        } );

        then( 'recebo uma mensagem de erro com um código 401 na Resposta', () => {
            expect( response.status ).toBe( 401 );
            expect( response.body.message ).toBe( 'Não autenticado' );
        } );
    } );



    afterAll( async () => {
        await app.close();
    } );

} );
