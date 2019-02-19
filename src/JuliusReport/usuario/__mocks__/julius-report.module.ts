// MODULO MOCKADO: ACESSO DIRETO AO BANCO REMOVIDO

import { Module } from '@nestjs/common';
import { BancoConfig } from '../../../common/configs/banco.config';
import { usuarioController } from '../usuario.controller'; //controller real
import { UsuarioService } from '../usuario.service'; //serviço real
const database = new BancoConfig();

@Module(
    {
        imports: [],
        controllers: [ usuarioController ],
        providers: [ UsuarioService ],
    }
)
export class JuliusReportModule { }

