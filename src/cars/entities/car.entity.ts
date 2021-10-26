import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Description } from 'src/descriptions/entities/description.entity';

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

  @Column({ nullable: false })
  @ApiProperty()
  acessorios: string;

  @Column({ nullable: false, type: 'int' })
  @ApiProperty()
  quantidadePassagerios: string;

  @CreateDateColumn()
  data_criacao: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;

  @ManyToOne(() => Description, (a) => a.car)
  @JoinColumn()
  descricoes: Description;
}
