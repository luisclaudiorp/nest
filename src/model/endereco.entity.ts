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
  @Column({ primary: true })
  id: number;

  @ApiProperty()
  @Column()
  cep: string;

  @ApiProperty()
  @Column()
  number: string;

  @ApiProperty()
  @Column()
  complemento: string;

  @ApiProperty()
  @Column()
  isFilial: boolean;

  @ApiProperty()
  @ManyToOne(() => Rental, (c) => c.enderecos)
  rental: Rental;
  endereco: Rental[];

  @Column()
  rentalId?: number;

  @CreateDateColumn({ select: false })
  data_criacao: Date;

  @UpdateDateColumn({ select: false })
  data_atualizacao: Date;
}
