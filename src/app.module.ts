import { Module } from '@nestjs/common';
import { JuliusReportModule } from './JuliusReport/julius-report.module';


@Module
  ( {
    imports: [ JuliusReportModule ]
  } )
export class AppModule { }
