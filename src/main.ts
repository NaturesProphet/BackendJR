import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DispatchError } from './common/filter/DispatchError';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const pacote = require( '../package.json' ); // dados do projeto
const ambiente = process.env.NODE_ENV; // informa se é ambiente DEV ou PROD

/**
 * procedimento que configura e inicializa a aplicação inteira
 */
async function bootstrap() {
  const app = await NestFactory.create( AppModule );
  app.useGlobalFilters( new DispatchError() ); // configura o filtro de erro global
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
  await app.listen( 3000 );
}


//inicia a aplicação
bootstrap();
