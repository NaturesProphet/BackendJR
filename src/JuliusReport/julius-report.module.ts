import { Module } from '@nestjs/common';
import { BancoConfig } from '../common/configs/banco.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';
const database = new BancoConfig();
@Module(
    {
        imports: [ TypeOrmModule.forRoot( {
            type: database.type,
            host: database.host,
            port: database.port,
            username: database.login,
            password: database.password,
            database: database.schema,
            entities: [ __dirname + '/**/*.model{.ts,.js}' ],
            synchronize: database.sync,
        } ), JuliusReportModule ],

        controllers: [ usuarioController ],
        providers: [ UsuarioService ],
    }
)
export class JuliusReportModule { }
