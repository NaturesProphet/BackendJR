import { PrimaryGeneratedColumn, BaseEntity, Entity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiModelProperty } from "@nestjs/swagger";

@Entity()
export class Posto extends BaseEntity {

    @PrimaryGeneratedColumn()
    @ApiModelProperty()
    id: number;

    @CreateDateColumn()
    @ApiModelProperty()
    dataregistro: Date;

    @UpdateDateColumn()
    @ApiModelProperty()
    atualizadoem: Date;



}
