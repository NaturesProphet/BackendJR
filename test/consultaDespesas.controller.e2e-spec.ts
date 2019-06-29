import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { loginPayload } from "../src/JuliusReport/login/loginPayload.dto";

jest.mock( "../src/JuliusReport/despesas/despesas.model" );
jest.mock( "../src/JuliusReport/julius-report.module" );
jest.mock( "../src/JuliusReport/usuario/usuario.model" );
jest.mock( "../src/JuliusReport/veiculo/veiculo.model" );
const feature = loadFeature( "./test/features/consultaDespesa.feature" );

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


    test( '1: O veículo consultado pertence ao usuário', ( { given, and, when, then } ) => {
        let endpoint: string;
        let response: any;
        let token: any;
        let veiculo_id: number;
        given( 'Quero listar todas as despesas de um dos meus veículos', () => {
            endpoint = '/despesa/veiculo';
        } );

        and( 'possuo um token de acesso válido', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'existente1';
            payload.senha = 'test@123***';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );

        and( 'informei um ID de um veículo que me pertence', () => {
            veiculo_id = 1;
        } );

        when( 'eu enviar a requisição', async () => {
            response = await request( app.getHttpServer() ).get( `${endpoint}/${veiculo_id}` )
                .set( { authorization: `Bearer ${token}` } );
        } );

        then( 'recebo um array com as despesas do veículo, com um código 200 na resposta', () => {
            expect( response.status ).toBe( 200 );
            let lista = JSON.parse( response.text );
            expect( lista.length ).toBeGreaterThanOrEqual( 0 );
            expect( lista[ 0 ].valorTotal ).toBeGreaterThan( 0 );
            expect( lista[ 0 ].veiculo_id ).toBe( 1 );
        } );
    } );


    test( '2: O veículo consultado NÃO pertence ao usuário', ( { given, and, when, then } ) => {
        let endpoint: string;
        let response: any;
        let token: any;
        let veiculo_id: number;
        given( 'Quero listar todas as despesas de um dos meus veículos', () => {
            endpoint = '/despesa/veiculo';
        } );

        and( 'possuo um token de acesso válido', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'existente1';
            payload.senha = 'test@123***';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );

        and( 'informei um ID de um veículo que NÃO me pertence', () => {
            veiculo_id = 54321;
        } );

        when( 'eu enviar a requisição', async () => {
            response = await request( app.getHttpServer() ).get( `${endpoint}/${veiculo_id}` )
                .set( { authorization: `Bearer ${token}` } );
        } );

        then( 'recebo uma mensagem de erro com um código 403 na resposta', () => {
            expect( response.status ).toBe( 403 );
            expect( response.body.message ).toBe( "O veiculo buscado não pertence ao usuário especificado na consulta" );
        } );
    } );


    test( '3: Não estou autenticado', ( { given, and, when, then } ) => {
        let endpoint: string;
        let response: any;
        let token: any;
        let veiculo_id: number;
        given( 'Quero listar todas as despesas de um dos meus veículos', () => {
            endpoint = '/despesa/veiculo';
        } );

        and( 'NÃO possuo um token de acesso válido', () => {
            token = null;
        } );

        when( 'eu enviar a requisição', async () => {
            response = await request( app.getHttpServer() ).get( `${endpoint}/${veiculo_id}` )
                .set( { authorization: `Bearer ${token}` } );
        } );

        then( 'recebo uma mensagem de erro com um código 401 na resposta', () => {
            expect( response.status ).toBe( 401 );
            expect( response.body.message ).toBe( "Não autenticado" );
        } );
    } );


    afterAll( async () => {
        await app.close();
    } );

} );
