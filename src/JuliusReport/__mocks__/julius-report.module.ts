import { Module } from '@nestjs/common';
import { usuarioController } from '../usuario/usuario.controller';
import { UsuarioService } from '../usuario/usuario.service';
import { LoginController } from '../../JuliusReport/login/login.controller';
import { LoginService } from '../../JuliusReport/login/login.service';

@Module(
    {
        imports: [],
        controllers: [ usuarioController, LoginController ],
        providers: [ UsuarioService, LoginService ],
    }
)
export class JuliusReportModule { }
