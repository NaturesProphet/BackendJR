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
const feature = loadFeature( "./test/features/veiculo.feature" );

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


    test( 'Os dados informados são válidos e o usuário está autenticado na seção', ( { given, and, when, then } ) => {
        let endpoint: string;
        let response: any;
        let dto = new VeiculoDto();
        let token;

        given( 'Quero registrar um novo veículo na minha frota', () => {
            endpoint = '/veiculo';
        } );

        and( 'tenho um token válido para me autenticar', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'existente';
            payload.senha = 'test@123***';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );

        and( 'informei dados corretos', () => {
            dto.anoFrabricacao = 1973;
            dto.anoModelo = 1973;
            dto.cor = 'preto';
            dto.marca = 'WolksWagen'
            dto.modelo = 'fusca';
            dto.observacoes = 'Fuscão pretoooooOoOoOoOoOo';
            dto.placa = 'KKK 6969';
            dto.usuario_id = 1
        } );

        when( 'eu enviar os dados de registro', async ( done ) => {
            response = await request( app.getHttpServer() ).post( endpoint )
                .send( dto ).set( { authorization: `Bearer ${token}` } );
        } );

        then( 'recebo uma mensagem de confirmação com um código 201 na Resposta', () => {
            expect( response.status ).toBe( 201 );
            expect( response.text ).toBe( "Veículo fusca placas KKK 6969 registrado para existente " );
        } );
    } );



    test( 'Os dados informados NÃO são válidos e o usuário está autenticado na seção', ( { given, and, when, then } ) => {
        let endpoint: string;
        let response: any;
        let dto = new VeiculoDto();
        let token;
        given( 'Quero registrar um novo veículo na minha frota', () => {
            endpoint = '/veiculo';
        } );

        and( 'tenho um token válido para me autenticar', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'existente';
            payload.senha = 'test@123***';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );

        and( 'Informei dados inválidos ou nulos', () => {
            dto.anoFrabricacao = 1973;
            dto.anoModelo = 1973;
            dto.cor = '';
            dto.marca = 'WolksWagen'
            dto.modelo = 'fusca';
            dto.observacoes = 'Fuscão pretoooooOoOoOoOoOo';
            dto.placa = 'KKK 6969';
            dto.usuario_id = 1
        } );

        when( 'eu enviar os dados de registro', async () => {
            response = await request( app.getHttpServer() ).post( endpoint )
                .send( dto ).set( { authorization: `Bearer ${token}` } );
        } );

        then( 'recebo uma mensagem de erro com um código 400 na Resposta', ( arg0 ) => {
            expect( response.status ).toBe( 400 );
            expect( response.text ).toBe( "Dados invalidos" );
        } );
    } );



    test( 'O usuário NÃO está autenticado na seção', ( { given, and, when, then } ) => {
        let endpoint: string;
        let response: any;
        let dto = new VeiculoDto();
        let token;
        given( 'Quero registrar um novo veículo na minha frota', () => {
            endpoint = '/veiculo';
        } );

        and( 'não tenho um token de acesso ou ele é inválido', async () => {
            let payload: loginPayload = new loginPayload();
            payload.login = 'WindowsTrabalhaMuitoBemSim';
            payload.senha = 'éVerdadeEsseBilete';
            token = await request( app.getHttpServer() ).post( '/login' ).send( payload );
            token = token.text;
        } );


        when( 'eu enviar os dados de registro', async () => {
            dto.anoFrabricacao = 1973;
            dto.anoModelo = 1973;
            dto.cor = 'preto';
            dto.marca = 'WolksWagen'
            dto.modelo = 'fusca';
            dto.observacoes = 'Fuscão pretoooooOoOoOoOoOo';
            dto.placa = 'KKK 6969';
            dto.usuario_id = 1
            response = await request( app.getHttpServer() ).post( endpoint )
                .send( dto ).set( { authorization: `Bearer ${token}` } );
        } );

        then( "recebo uma mensagem de erro com um código 401 na Resposta", async () => {
            expect( response.status ).toBe( 403 );
            expect( response.text ).toBe( "Não autenticado" );
        } );
    } );



    afterAll( async () => {
        await app.close();
    } );

} );
