import { Module } from '@nestjs/common';
import { BancoConfig } from '../common/configs/banco.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { VeiculoController } from './veiculo/veiculo.controller';
import { VeiculoService } from './veiculo/veiculo.service';
import { PostoService } from './posto/posto.service';
import { PostoController } from './posto/posto.controller';
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
            synchronize: database.sync
        } ), JuliusReportModule ],

        controllers: [ usuarioController, LoginController, VeiculoController, PostoController ],
        providers: [ UsuarioService, LoginService, VeiculoService, PostoService ],
    }
)
export class JuliusReportModule { }
