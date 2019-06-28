import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity, Entity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Veiculo } from "../veiculo/veiculo.model";

@Entity()
export class Despesa extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  dataregistro: Date;

  @UpdateDateColumn()
  atualizadoem: Date;

  @Column()
  tipo: 'imposto' | 'taxa' | 'multa';

  @Column( { name: 'datapagamento', type: 'date' } )
  dataPagamento: Date;

  @Column()
  descricao: string;

  @Column( { name: 'valortotal', type: 'float' } )
  valorTotal: number;

  @ManyToOne( type => Veiculo, { nullable: false } )
  @JoinColumn( { name: "veiculo_id" } )
  veiculo_id: number;
}
