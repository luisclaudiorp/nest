import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Endereco } from './endereco.entity';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  @ApiProperty()
  nome: string;

  @Column({ nullable: false, type: 'varchar', length: 18 })
  @ApiProperty()
  cnpj: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  @ApiProperty()
  atividades: string;

  @OneToMany(() => Endereco, (e) => e.rental)
  @ApiProperty({ type: () => Endereco })
  enderecos: Endereco[];

  @CreateDateColumn()
  data_criacao: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;
}
