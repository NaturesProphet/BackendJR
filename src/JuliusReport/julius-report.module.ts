import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { VeiculoController } from './veiculo/veiculo.controller';
import { VeiculoService } from './veiculo/veiculo.service';
import { PostoService } from './posto/posto.service';
import { PostoController } from './posto/posto.controller';
import {
    db_host, db_port, db_username,
    db_password, db_schema, orm_sync
} from '../common/configs/banco.config';


@Module(
    {
        imports: [ TypeOrmModule.forRoot( {
            type: 'postgres',
            host: db_host,
            port: db_port,
            username: db_username,
            password: db_password,
            database: db_schema,
            entities: [ __dirname + '/**/*.model{.ts,.js}' ],
            synchronize: orm_sync
        } ), JuliusReportModule ],

        controllers: [ usuarioController, LoginController, VeiculoController, PostoController ],
        providers: [ UsuarioService, LoginService, VeiculoService, PostoService ],
    }
)
export class JuliusReportModule { }
