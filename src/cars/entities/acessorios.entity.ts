import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Car } from 'src/cars/entities/car.entity';

@Entity()
export class Acessorio {
  @PrimaryGeneratedColumn()
  @Column({ primary: true, select: false })
  id: number;

  @ApiProperty()
  @Column()
  descricao: string;

  @CreateDateColumn({ select: false })
  data_criacao: Date;

  @UpdateDateColumn({ select: false })
  data_atualizacao: Date;

  @ManyToOne(() => Car, (c) => c.acessorios)
  car: Car;
}