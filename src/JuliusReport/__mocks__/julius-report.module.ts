import { Module } from '@nestjs/common';
import { usuarioController } from '../usuario/usuario.controller';
import { UsuarioService } from '../usuario/usuario.service';
import { LoginController } from '../../JuliusReport/login/login.controller';
import { LoginService } from '../../JuliusReport/login/login.service';
import { VeiculoController } from '../../JuliusReport/veiculo/veiculo.controller';
import { VeiculoService } from '../../JuliusReport/veiculo/veiculo.service';

@Module(
    {
        imports: [],
        controllers: [ usuarioController, LoginController, VeiculoController ],
        providers: [ UsuarioService, LoginService, VeiculoService ],
    }
)
export class JuliusReportModule { }
