import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";


jest.mock( "../src/JuliusReport/usuario/usuario.model" );
jest.mock( "../src/JuliusReport/julius-report.module" );
const feature = loadFeature( "./test/features/login.feature" );

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

  test( 'Usuário existe', ( { given, when, then } ) => {
    let response: any;
    let endpoint: string;
    let payload: any;
    given( 'Quero acessar o sistema via login/senha', () => {
      // define o endpoint adequado para atender a intenção descrita
      endpoint = '/login';
    } );

    when( 'eu me autenticar', async () => {
      // monta o payload de autenticação fake a ser enviado
      // ----------------------------------------------
      payload = { "login": "existente", "senha": "test@123***" }
      // ----------------------------------------------
      // e então simula o envio
      response = await request( app.getHttpServer() ).post( endpoint ).send( payload );
    } );

    then( "recebo um token de autenticação com meus dados criptografados e um status 200", () => {
      expect( response.status ).toBe( 200 );
      expect( response.text.length ).toBe( 431 );
    } );
  } );



  test( 'Usuário NÃO existe', ( { given, and, when, then } ) => {
    let response: any;
    let endpoint: string;
    let payload: any;
    given( 'Quero acessar o sistema via login/senha', () => {
      // define o endpoint adequado para atender a intenção descrita
      endpoint = '/login';
    } );

    and( 'forneci um login que não existe', () => {
      // monta o payload de autenticação fake a ser enviado
      // ----------------------------------------------
      payload = { "login": "MundialDoPalmeiras", "senha": "123321" }
    } );

    when( 'eu tentar me autenticar', async () => {
      // e então simula o envio
      response = await request( app.getHttpServer() ).post( endpoint ).send( payload );
    } );

    then( 'recebo uma mensagem de erro com um código 406 na resposta', () => {
      expect( response.status ).toBe( 406 );
      expect( response.text ).toBe( 'O login informado não foi encontrado' );
    } );
  } );

  test( 'Usuário existe MAS a senha está incorreta', ( { given, and, when, then } ) => {
    let response: any;
    let endpoint: string;
    let payload: any;
    given( 'Quero acessar o sistema via login/senha', () => {
      // define o endpoint adequado para atender a intenção descrita
      endpoint = '/login';
    } );

    and( 'forneci uma senha incompatível', () => {
      // monta o payload de autenticação fake a ser enviado
      // ----------------------------------------------
      payload = { "login": "existente", "senha": "Windows" }
    } );

    when( 'eu tentar me autenticar', async () => {
      // e então simula o envio
      response = await request( app.getHttpServer() ).post( endpoint ).send( payload );
    } );

    then( "recebo uma mensagem de erro com um código 401 na resposta", () => {
      expect( response.status ).toBe( 401 );
      expect( response.text ).toBe( "Autorização negada. As credenciais não bateram" );
    } );
  } );

  afterAll( async () => {
    await app.close();
  } );

} );
