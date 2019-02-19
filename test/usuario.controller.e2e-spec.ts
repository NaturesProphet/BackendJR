import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { UsuarioDto } from "../src/JuliusReport/usuario/usuario.dto";
const feature = loadFeature( "./test/features/usuario.feature" );
jest.mock( "../src/JuliusReport/julius-report.module" );

let retorno: any;
let usuario: UsuarioDto;

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

    test( "Os dados informados são válidos", ( {
        given,
        when,
        then
    } ) => {
        given( "Quero registrar um novo usuário no sistema", async () => {
            usuario = new UsuarioDto();
            usuario.email = 'meunomeébond@james.bond';
            usuario.endereco = 'rua xiita 45';
            usuario.login = 'bond';
            usuario.nome = 'James Bond';
            usuario.senha = '007';
            usuario.telefone = '007 6969';
        } );

        when( "eu enviar os dados de registro", async () => {
            retorno = await request( app.getHttpServer() ).post( '/usuario' ).send( usuario );
        } );

        then( "recebo uma mensagem de confirmação com um código 201 na Resposta", async () => {
            expect( retorno.status ).toBe( 201 );
        } );
    } );








    test( "Os dados informados NÃO são válidos", ( {
        given,
        when,
        then
    } ) => {
        given( "Quero registrar um novo usuário no sistema", async () => {
            usuario = new UsuarioDto();
            usuario.email = 'meunomeébond@james.bond';
            usuario.endereco = 'rua xiita 45';
            usuario.login = 'bond';
            usuario.nome = 'James Bond';
            usuario.senha = '007';
            usuario.telefone = '007 6969';
        } );

        when( "eu enviar os dados de registro", async () => {
            retorno = await request( app.getHttpServer() ).post( '/usuario' ).send( usuario );
        } );

        then( "recebo uma mensagem de confirmação com um código 201 na Resposta", async () => {
            expect( retorno.status ).toBe( 201 );
        } );
    } );












} );