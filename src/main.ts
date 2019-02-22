import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const pacote = require( '../package.json' ); // dados do projeto
const ambiente = process.env.NODE_ENV; // informa se é ambiente DEV ou PROD
let porta = process.env.PORT || 3000;
import cookieSession = require( 'cookie-session' );
/**
 * procedimento que configura e inicializa a aplicação inteira
 */
async function bootstrap () {
  const app = await NestFactory.create( AppModule );


  // configura o cookie da seção
  app.use( cookieSession( {
    name: 'JuliusReport',
    keys: [ process.env.BISCOITO || 'julius' ],
    // Cookie Options
    maxAge: 60 * 60 * 1000,
  } ) );



  let options; // seleciona o schema http fora de prod e https em prod
  if ( ambiente == 'production' ) {
    options = new DocumentBuilder()
      .setTitle( 'Julius Report' )
      .setDescription( pacote.description )
      .setVersion( pacote.version )
      .addTag( 'JuliusReport' )
      .setSchemes( 'https', 'http' )
      .build();
  } else {
    options = new DocumentBuilder()
      .setTitle( 'Julius Report' )
      .setDescription( pacote.description )
      .setVersion( pacote.version )
      .addTag( 'Documentação das rotas disponíveis na API' )
      .setSchemes( 'http', 'https' )
      .build();
  }
  const document = SwaggerModule.createDocument( app, options );
  SwaggerModule.setup( 'docs', app, document );
  await app.listen( porta );
  console.log( `API ouvindo na porta ${porta}` );
}


//inicia a aplicação
bootstrap();
