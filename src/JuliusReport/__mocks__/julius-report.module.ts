import { Module } from '@nestjs/common';
import { BancoConfig } from '../../common/configs/banco.config';
import { usuarioController } from '../usuario/usuario.controller';
import { UsuarioService } from '../usuario/usuario.service';
const database = new BancoConfig();
@Module(
    {
        imports: [],
        controllers: [ usuarioController ],
        providers: [ UsuarioService ],
    }
)
export class JuliusReportModule { }
