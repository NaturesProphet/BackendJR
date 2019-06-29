import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { loginPayload } from "../src/JuliusReport/login/loginPayload.dto";

jest.mock( "../src/JuliusReport/manutencao/manutencao.model" );
jest.mock( "../src/JuliusReport/julius-report.module" );
jest.mock( "../src/JuliusReport/usuario/usuario.model" );
jest.mock( "../src/JuliusReport/veiculo/veiculo.model" );
const feature = loadFeature( "./test/features/consultaManutencao.feature" );

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

    test( '1: O usuário consulta todas as manutenções de um veículo', ( { given, and, when, then } ) => {
        let endpoint: string;
        let response: any;
        let token: any;
        let veiculo_id: number;
        given( 'Quero listar todas as manutencoes de um veículo', () => {
            endpoint = '/manutencao/veiculo';
        } );

        and( 'Tenho um token de acesso válido', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'donoDaFrota123';
            payload.senha = 'test@123***';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );

        when( 'eu enviar a requisição', async () => {
            veiculo_id = 54321;
            response = await request( app.getHttpServer() ).get( `${endpoint}/${veiculo_id}` )
                .set( { authorization: `Bearer ${token}` } );
        } );

        then( 'recebo um array com as manutencoes do veículo, com um código 200 na resposta', () => {
            expect( response.status ).toBe( 200 );
            let lista = JSON.parse( response.text );
            expect( lista.length ).toBeGreaterThanOrEqual( 0 );
        } );
    } );


    test( '2: O veículo consultado NÃO pertence ao usuário', ( { given, and, when, then } ) => {
        let endpoint: string;
        let response: any;
        let token: any;
        let veiculo_id: number;
        given( 'Quero listar todas as manutencoes de um veículo', () => {
            endpoint = '/manutencao/veiculo';
        } );

        and( 'Tenho um token de acesso válido', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'donoDaFrota123';
            payload.senha = 'test@123***';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );

        and( 'informei um ID de um veículo que NÃO me pertence', () => {
            veiculo_id = 1;
        } );

        when( 'eu enviar a requisição', async () => {
            response = await request( app.getHttpServer() ).get( `${endpoint}/${veiculo_id}` )
                .set( { authorization: `Bearer ${token}` } );
        } );

        then( 'recebo uma mensagem de erro, com o código 403 na resposta', () => {
            expect( response.status ).toBe( 403 );
            expect( response.body.message ).toBe( "O veiculo buscado não pertence ao usuário especificado na consulta" );
        } );
    } );

    test( '3: O veículo consultado não existe', ( { given, and, when, then } ) => {
        let endpoint: string;
        let response: any;
        let token: any;
        let veiculo_id: number;
        given( 'Quero listar todas as manutencoes de um veículo', () => {
            endpoint = '/manutencao/veiculo';
        } );

        and( 'Tenho um token de acesso válido', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'donoDaFrota123';
            payload.senha = 'test@123***';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );

        and( 'informei um ID de um veículo que não existe no banco de dados', () => {
            veiculo_id = 0;
        } );

        when( 'eu enviar a requisição', async () => {
            response = await request( app.getHttpServer() ).get( `${endpoint}/${veiculo_id}` )
                .set( { authorization: `Bearer ${token}` } );
        } );

        then( 'recebo uma mensagem de erro, com o código 400 na resposta', () => {
            expect( response.status ).toBe( 400 );
            expect( response.body.message ).toBe( 'O veículo informado não existe' );
        } );
    } );

    test( '4: O Usuário não está autenticado', ( { given, and, when, then } ) => {
        let endpoint: string;
        let response: any;
        let token: any;
        let veiculo_id: number;
        given( 'Quero listar todas as manutencoes de um veículo', () => {
            endpoint = '/manutencao/veiculo';
        } );

        and( 'NÃO tenho um token de acesso válido', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'WindowsTrabalhaMuitoBemSim';
            payload.senha = 'éVerdadeEsseBilete';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );

        when( 'eu enviar a requisição', async () => {
            veiculo_id = 1;
            response = await request( app.getHttpServer() ).get( `${endpoint}/${veiculo_id}` )
                .set( { authorization: `Bearer ${token}` } );
        } );

        then( 'recebo uma mensagem de erro, com o código 401 na resposta', () => {
            expect( response.status ).toBe( 401 );
            expect( response.body.message ).toBe( 'Não autenticado' );
        } );
    } );

    afterAll( async () => {
        await app.close();
    } );
} );
