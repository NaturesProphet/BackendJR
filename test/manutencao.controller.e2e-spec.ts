import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { loginPayload } from "../src/JuliusReport/login/loginPayload.dto";

const feature = loadFeature( "./test/features/manutencao.feature" );

jest.mock( "../src/JuliusReport/manutencao/manutencao.model" );
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
        given( 'Quero registrar uma nova manutenção de um veículo', () => {
            endpoint = '/manutencao';
        } );

        and( 'Tenho um token de acesso válido', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'donoDaFrota123';
            payload.senha = 'test@123***';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );

        when( 'eu enviar os dados de registro', async () => {
            body = {
                dataInicio: new Date(),
                dataFinal: new Date(),
                descricao: 'Serviço de teste',
                local: 'Oficina do Tião Lanterneiro',
                valorMaterial: 100.00,
                valorServico: 80.00,
                veiculo_id: 54321
            }
            response = await request( app.getHttpServer() ).post( endpoint )
                .send( body ).set( { authorization: `Bearer ${token}` } );
        } );

        then( 'recebo uma mensagem de confirmação com um código 201 na Resposta', () => {
            expect( response.status ).toBe( 201 );
            expect( response.text ).toBe( 'Manutenção registrada' );
        } );
    } );


    test( '2: Os dados informados NÃO são válidos', ( { given, and, when, then } ) => {
        let endpoint: string;
        let body: any;
        let response: any;
        let token: any;
        given( 'Quero registrar uma nova manutenção de um veículo', () => {
            endpoint = '/manutencao';
        } );

        and( 'Tenho um token de acesso válido', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'donoDaFrota123';
            payload.senha = 'test@123***';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );

        and( 'Esqueci de preencher algum dado ou digitei errado', () => {
            body = {
                dataInicio: new Date(),
                dataFinal: null,
                descricao: 'Serviço de teste',
                local: 'Oficina do Tião Lanterneiro',
                valorMaterial: null,
                valorServico: 80.00,
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


    test( '3: O Veículo informado não pertence ao usuário que enviou a requisição', ( { given, and, when, then } ) => {
        let endpoint: string;
        let body: any;
        let response: any;
        let token: any;
        given( 'Quero registrar uma nova manutenção de um veículo', () => {
            endpoint = '/manutencao';
        } );

        and( 'Tenho um token de acesso válido', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'donoDaFrota123';
            payload.senha = 'test@123***';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );

        and( 'informei o ID de um veículo que não me pertence', () => {
            body = {
                dataInicio: new Date(),
                dataFinal: new Date(),
                descricao: 'Serviço de teste',
                local: 'Oficina do Tião Lanterneiro',
                valorMaterial: 100.00,
                valorServico: 80.00,
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


    test( '4: O Veículo informado não existe no banco de dados', ( { given, and, when, then } ) => {
        let endpoint: string;
        let body: any;
        let response: any;
        let token: any;
        given( 'Quero registrar uma nova manutenção de um veículo', () => {
            endpoint = '/manutencao';
        } );

        and( 'Tenho um token de acesso válido', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'donoDaFrota123';
            payload.senha = 'test@123***';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );

        and( 'informei o ID de um veículo que não existe no banco de dados', () => {
            body = {
                dataInicio: new Date(),
                dataFinal: new Date(),
                descricao: 'Serviço de teste',
                local: 'Oficina do Tião Lanterneiro',
                valorMaterial: 100.00,
                valorServico: 80.00,
                veiculo_id: 0
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


    test( '5: O usuário não está autenticado', ( { given, and, when, then } ) => {
        let endpoint: string;
        let body: any;
        let response: any;
        let token: any;
        given( 'Quero registrar uma nova manutenção de um veículo', () => {
            endpoint = '/manutencao';
        } );

        and( 'Não possuo um token de acesso válido ou ele já expirou', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'WindowsTrabalhaMuitoBemSim';
            payload.senha = 'éVerdadeEsseBilete';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );

        when( 'eu enviar os dados de registro', async () => {
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
