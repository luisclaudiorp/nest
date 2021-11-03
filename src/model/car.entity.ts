import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Acessorio } from './acessories.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  @ApiProperty()
  modelo: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  @ApiProperty()
  cor: string;

  @Column({ nullable: false, type: 'varchar', length: 10 })
  @ApiProperty()
  ano: number;

  @OneToMany(() => Acessorio, (a) => a.car)
  @ApiProperty()
  acessorios: Acessorio;

  @Column({ nullable: false, type: 'int' })
  @ApiProperty()
  quantidadePassagerios: number;

  @CreateDateColumn()
  data_criacao: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;
}
