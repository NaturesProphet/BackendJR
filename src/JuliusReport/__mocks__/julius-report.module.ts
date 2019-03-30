import { Module } from '@nestjs/common';
import { usuarioController } from '../usuario/usuario.controller';
import { UsuarioService } from '../usuario/usuario.service';
import { LoginController } from '../../JuliusReport/login/login.controller';
import { LoginService } from '../../JuliusReport/login/login.service';
import { VeiculoController } from '../../JuliusReport/veiculo/veiculo.controller';
import { VeiculoService } from '../../JuliusReport/veiculo/veiculo.service';
import { PostoService } from '../posto/posto.service';
import { PostoController } from '../posto/posto.controller';

@Module(
    {
        imports: [],
        controllers: [ usuarioController, LoginController, VeiculoController, PostoController ],
        providers: [ UsuarioService, LoginService, VeiculoService, PostoService ],
    }
)
export class JuliusReportModule { }
