import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity, Entity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Veiculo } from "../veiculo/veiculo.model";
import { Posto } from "../posto/posto.model";

@Entity()
export class Abastecimento extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  dataregistro: Date;

  @UpdateDateColumn()
  atualizadoem: Date;

  @Column( { name: 'valortotal', type: 'float' } )
  valorTotal: number;

  @Column( { name: 'valorlitros', type: 'float' } )
  valorLitro: number;

  @Column()
  combustivel: 'Gasolina comum' | 'Gasolina aditivada' | 'Gasolina premium' | 'Alcool';

  @Column( { type: 'date' } )
  data: Date;

  @Column( { type: "int" } )
  km: number;

  @ManyToOne( type => Veiculo, { nullable: false } )
  @JoinColumn( { name: "veiculo_id" } )
  veiculo_id: number;

  @ManyToOne( type => Posto, { nullable: false } )
  @JoinColumn( { name: "posto_id" } )
  posto_id: number;
}
