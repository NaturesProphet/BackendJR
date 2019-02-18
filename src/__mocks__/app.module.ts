
// modulo mockado sem o TypeORM

import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { BancoConfig } from '../common/configs/banco.config';
const database = new BancoConfig();

@Module( {
  imports: [],
  controllers: [ AppController ],
  providers: [ AppService ],
} )

export class AppModule { }
