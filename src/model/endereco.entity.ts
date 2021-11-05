import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Rental } from './rental.entity';

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn()
  @Column({ primary: true, select: false })
  id: number;

  @ApiProperty()
  @Column({ nullable: false, type: 'varchar', length: 9 })
  cep: string;

  @ApiProperty()
  @Column({ nullable: false, type: 'varchar', length: 10 })
  number: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 200 })
  complemento: string;

  @ApiProperty()
  @Column({ nullable: false, type: 'varchar', length: 100 })
  localidade: string;

  @ApiProperty()
  @Column({ nullable: false, type: 'varchar', length: 100 })
  logradouro: string;

  @ApiProperty()
  @Column({ nullable: false, type: 'varchar', length: 200 })
  bairro: string;

  @ApiProperty()
  @Column({ nullable: false, type: 'varchar', length: 3 })
  uf: string;

  @ApiProperty()
  @Column('enum', { enum: ['true', 'false'], default: false, select: false })
  isFilial: string;

  @ManyToOne(() => Rental, (r) => r.enderecos)
  rental: Rental;

  @Column({ default: false, select: false })
  rentalId?: number;

  @CreateDateColumn({ select: false })
  data_criacao: Date;

  @UpdateDateColumn({ select: false })
  data_atualizacao: Date;
}
