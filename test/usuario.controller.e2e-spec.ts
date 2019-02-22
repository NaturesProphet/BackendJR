import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { UsuarioDto } from "../src/JuliusReport/usuario/usuario.dto";
jest.mock( "../src/JuliusReport/usuario/usuario.service" );
jest.mock( "../src/JuliusReport/julius-report.module" );
const feature = loadFeature( "./test/features/usuario.feature" );

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

  test( 'Os dados informados são válidos', ( { given, when, then } ) => {
    let endpoint: string;
    let objeto: UsuarioDto;
    let response: any;
    given( 'Quero registrar um novo usuário no sistema', () => {
      // define o endpoint adequado para atender a intenção descrita
      endpoint = '/usuario'
    } );

    when( 'eu enviar os dados de registro', async () => {
      // monta o objeto fake a ser enviado
      // ----------------------------------------------
      objeto = new UsuarioDto();
      objeto.email = 'email@servidor.com';
      objeto.endereco = 'rua da lama 69';
      objeto.login = 'jamesbond';
      objeto.nome = 'James Bond';
      objeto.senha = '007contragoldeneye';
      objeto.telefone = '2260000';
      // ----------------------------------------------
      // ----------------------------------------------
      // e então simula o envio
      response = await request( app.getHttpServer() ).post( endpoint ).send( objeto );

    } );

    then( 'recebo uma mensagem de confirmação com um código 201 na Resposta', () => {
      expect( response.status ).toBe( 201 );
      expect( response.text.split( ' ' )[ 0 ] ).toBe( 'Usuario' );
      expect( response.text.split( ' ' )[ 1 ] ).toBe( 'cadastrado:' );
    } );
  } );



  test( 'Os dados informados NÃO são válidos', ( { given, and, when, then } ) => {
    let endpoint: string;
    let objeto: UsuarioDto;
    let response: any;
    given( 'Quero registrar um novo usuário no sistema', () => {
      // define o endpoint adequado para atender a intenção descrita
      endpoint = '/usuario'
    } );

    and( 'digitei dados de registro inválidos ou nulos', () => {
      // monta um objeto fake usando alguns dados inválidos
      // ----------------------------------------------
      objeto = new UsuarioDto();
      objeto.email = 'emailSemArroba_servidor.com'; //falta arroba
      objeto.endereco = 'rua da lama 69';
      objeto.login = 'jamesbond';
      objeto.nome = 'James Bond';
      objeto.senha = '007'; // senha curta
      objeto.telefone = '2260000';
    } );

    when( 'eu enviar os dados de registro', async () => {
      // simula o envio
      response = await request( app.getHttpServer() ).post( endpoint ).send( objeto );
    } );

    then( "recebo uma mensagem de erro com um código 400 na Resposta", ( arg0 ) => {
      expect( response.status ).toBe( 400 );
      expect( response.text ).toBe( "Os dados informados são inválidos, verifique e tente novamente" );
    } );
  } );


  test( 'O Usuário já existe', ( { given, and, when, then } ) => {
    let endpoint: string;
    let objeto: UsuarioDto;
    let response: any;
    given( 'Quero registrar um novo usuário no sistema', () => {
      // define o endpoint adequado para atender a intenção descrita
      endpoint = '/usuario'
    } );

    and( 'digitei um nome de login que já existe no sistema', () => {
      // monta um objeto fake usando alguns dados inválidos
      // ----------------------------------------------
      objeto = new UsuarioDto();
      objeto.email = 'emailSemArroba@servidor.com';
      objeto.endereco = 'rua da lama 69';
      objeto.login = 'existente'; // nome de um login existente simulado no mock
      objeto.nome = 'James Bond';
      objeto.senha = '007contragoldeneye';
      objeto.telefone = '2260000';
    } );

    when( 'eu enviar os dados de registro', async () => {
      // simula o envio
      response = await request( app.getHttpServer() ).post( endpoint ).send( objeto );
    } );

    then( 'recebo uma mensagem de erro com um código 422 na Resposta', () => {
      expect( response.status ).toBe( 422 );
      expect( response.text ).toBe( "Este nome de usuário já existe em nossos registros. Tente outro." );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
