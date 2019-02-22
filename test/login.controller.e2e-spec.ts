import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { Usuario } from "../src/JuliusReport/usuario/usuario.model";

jest.mock( "../src/JuliusReport/usuario/usuario.service" );
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
    app.listen( 4000 );
  } );

  test( 'Usuário existe e possui apenas um veículo', ( { given, when, then } ) => {
    let usuario: Usuario;
    let response: any;
    let endpoint: string;
    given( 'Quero acessar o sistema via login/senha', () => {
      // veiculos ainda não implementados. aguardando implementação
    } );

    when( 'eu me autenticar', () => {
      // veiculos ainda não implementados. aguardando implementação
    } );

    then( "recebo os dados do meu perfil e veículo na seção com um código 200 na resposta", () => {
      // veiculos ainda não implementados. aguardando implementação
    } );
  } );


  test( 'Usuário existe e possui mais que um veículo ou nenhum', ( { given, when, then } ) => {
    let usuario: Usuario;
    let response: any;
    let endpoint: string;
    given( 'Quero acessar o sistema via login/senha', () => {
      // veiculos ainda não implementados. aguardando implementação
    } );

    when( 'eu me autenticar', () => {
      // veiculos ainda não implementados. aguardando implementação
    } );

    then( "recebo apenas os dados do meu perfil na seção com um código 200 na resposta", ( arg0 ) => {
      // veiculos ainda não implementados. aguardando implementação
    } );
  } );


  test( 'Usuário NÃO existe', ( { given, and, when, then } ) => {
    let response: any;
    let endpoint: string;
    let payload: any;
    given( 'Quero acessar o sistema via login/senha', () => {
      endpoint = '/login';
    } );

    and( 'forneci um login que não existe', () => {
      payload = { "login": "MundialDoPalmeiras", "senha": "123321" }
    } );

    when( 'eu tentar me autenticar', async () => {
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
      endpoint = '/login';
    } );

    and( 'forneci uma senha incompatível', () => {
      payload = { "login": "existente", "senha": "Windows" }
    } );

    when( 'eu tentar me autenticar', async () => {
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
