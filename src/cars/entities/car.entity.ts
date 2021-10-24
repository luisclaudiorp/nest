import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  modelo: string;

  @Column()
  @ApiProperty()
  cor: string;

  @Column()
  @ApiProperty()
  ano: string;

  @Column('simple-array')
  @ApiProperty()
  acessorios: string[];

  @Column()
  @ApiProperty()
  quantidadePassagerios: string;

  @CreateDateColumn()
  data_criacao: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;
}
