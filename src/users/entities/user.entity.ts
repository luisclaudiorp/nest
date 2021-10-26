import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['cpf'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @ApiProperty()
  nome: string;

  @Column({ nullable: false, type: 'varchar', length: 11 })
  @ApiProperty()
  cpf: string;

  @Column({ nullable: false, type: 'varchar', length: 11 })
  @ApiProperty()
  data_nascimento: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  @ApiProperty()
  email: string;

  @Column({ nullable: false })
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
