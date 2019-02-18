import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DispatchError } from './common/filter/DispatchError';

async function bootstrap() {
  const app = await NestFactory.create( AppModule );
  app.useGlobalFilters( new DispatchError() );
  await app.listen( 3000 );
}
bootstrap();
