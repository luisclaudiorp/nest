import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  nome: string;

  @Column({ type: 'varchar', length: 11, unique: true })
  @ApiProperty()
  cpf: string;

  @Column()
  @ApiProperty()
  data_nascimento: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  senha: string;

  @Column('enum', { enum: ['sim', 'nao'] })
  @ApiProperty()
  habilitado: string;

  @CreateDateColumn()
  data_criacao: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;
}
