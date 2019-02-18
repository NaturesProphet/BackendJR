import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BancoConfig } from './common/configs/banco.config';
const database = new BancoConfig();

@Module( {
  imports: [ TypeOrmModule.forRoot( {
    type: database.type,
    host: database.host,
    port: database.port,
    username: database.login,
    password: database.password,
    database: database.schema,
    entities: [ __dirname + '/**/*.model{.ts,.js}' ],
    synchronize: database.sync,
  } ) ],

  controllers: [ AppController ],
  providers: [ AppService ],
} )
export class AppModule { }
