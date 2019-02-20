import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
jest.mock( '../src/JuliusReport/usuario/usuario.service' );
jest.mock( '../src/JuliusReport/julius-report.module' );

describe( 'UsuarioController (e2e)', () => {
  let app;

  beforeEach( async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule( {
      imports: [ AppModule ],
    } ).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  } );

  it( '/ (GET)', () => {
    return request( app.getHttpServer() )
      .get( '/' )
      .expect( 404 );
  } );

  afterAll( async () => {
    await app.close();
  } );

} );
