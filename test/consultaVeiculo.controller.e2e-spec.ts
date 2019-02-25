import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { VeiculoDto } from "../src/JuliusReport/veiculo/veiculo.dto";
import { loginPayload } from "../src/JuliusReport/login/loginPayload.dto";

jest.mock( "../src/JuliusReport/usuario/usuario.model" );
jest.mock( "../src/JuliusReport/julius-report.module" );
jest.mock( "../src/JuliusReport/veiculo/veiculo.model" );
const feature = loadFeature( "./test/features/consultaVeiculo.feature" );

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


    test( '1: O usuário consulta todos os veículos', ( { given, and, when, then } ) => {
        let endpoint: string;
        let response: any;
        let token;
        given( 'Quero listar todos os veículos que registrei', () => {
            endpoint = '/veiculo';
        } );

        and( 'tenho um token de autenticação válido', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'existente1';
            payload.senha = 'test@123***';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );

        when( 'eu enviar a requisição', async () => {
            response = await request( app.getHttpServer() ).get( endpoint )
                .set( { authorization: `Bearer ${token}` } );
        } );

        then( "recebo um array com os veículos, com um código 200 na resposta", () => {
            expect( response.status ).toBe( 200 );
            let lista = JSON.parse( response.text );
            expect( lista[ 0 ].placa ).toBe( 'KKK 6969' );
            expect( lista[ 0 ].modelo ).toBe( 'Fuscão' );
            expect( lista[ 0 ].cor ).toBe( 'preto' );

        } );
    } );



    test( '2: O usuário TENTA consultar todos os veículos', ( { given, and, when, then } ) => {
        let endpoint: string;
        let response: any;
        let dto = new VeiculoDto();
        let token;
        given( 'Quero listar todos os veículos que registrei', () => {
            endpoint = '/veiculo';
        } );

        and( 'NÃO tenho um token de autenticação válido na seção', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'WindowsEstavel';
            payload.senha = 'muitoprovavel';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );

        when( 'eu enviar a requisição', async () => {
            response = await request( app.getHttpServer() ).get( endpoint )
                .set( { authorization: `Bearer ${token}` } );
        } );

        then( 'recebo uma mensagem de erro com o código 401 na resposta', () => {
            expect( response.status ).toBe( 401 );
            expect( response.text ).toBe( "Não autenticado" );
        } );
    } );





    afterAll( async () => {
        await app.close();
    } );

} );
