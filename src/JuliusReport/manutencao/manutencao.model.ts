import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity, Entity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Veiculo } from "../veiculo/veiculo.model";

@Entity()
export class Manutencao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  dataregistro: Date;

  @UpdateDateColumn()
  atualizadoem: Date;

  @Column()
  local: string

  @Column( { name: 'valormaterial', type: 'float' } )
  valorMaterial: number;

  @Column( { name: 'valorservico', type: 'float' } )
  valorServico: number;

  @Column()
  descricao: string;

  @Column( { name: 'datainicio', type: 'date' } )
  dataInicio: Date;

  @Column( { name: 'datafinal', type: 'date' } )
  dataFinal: Date;

  @ManyToOne( type => Veiculo, { nullable: false } )
  @JoinColumn( { name: "veiculo_id" } )
  veiculo_id: number;
}