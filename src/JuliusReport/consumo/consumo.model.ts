import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity, Entity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Abastecimento } from "../abastecimento/abastecimento.model";

@Entity()
export class Consumo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  dataregistro: Date;

  @UpdateDateColumn()
  atualizadoem: Date;

  @Column( { type: 'float' } )
  valor: number;

  @Column()
  ar: 'Ligado sempre' | 'Uso moderado' | 'Pouco uso' | 'Desligado'

  @Column()
  trajeto: 'Estrada - planicie' | 'Estrada - montanha'
    | 'Cidade - transito ruim' | 'Cidade - trânsito normal';

  @Column( { type: "int" } )
  ocupantes: number;

  @ManyToOne( type => Abastecimento, { nullable: false } )
  @JoinColumn( { name: "abastecimento_id" } )
  abastecimento_id: number;
}
