import { Module } from '@nestjs/common';
import { usuarioController } from '../usuario/usuario.controller';
import { UsuarioService } from '../usuario/usuario.service';
import { LoginController } from '../../JuliusReport/login/login.controller';
import { LoginService } from '../../JuliusReport/login/login.service';
import { VeiculoController } from '../../JuliusReport/veiculo/veiculo.controller';
import { VeiculoService } from '../../JuliusReport/veiculo/veiculo.service';
import { PostoService } from '../posto/posto.service';
import { PostoController } from '../posto/posto.controller';
import { DespesaController } from '../despesas/despesas.controller';
import { DespesaService } from '../despesas/despesas.service';
import { ManutencaoController } from '../manutencao/manutencao.controller';
import { ManutencaoService } from '../manutencao/manutencao.service';

@Module(
    {
        imports: [],
        controllers: [ usuarioController, LoginController, VeiculoController, PostoController,
            DespesaController, ManutencaoController ],

        providers: [ UsuarioService, LoginService, VeiculoService, PostoService,
            DespesaService, ManutencaoService ],
    }
)
export class JuliusReportModule { }
