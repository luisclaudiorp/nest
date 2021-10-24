import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  nome: string;

  @Column()
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

  @Column()
  @ApiProperty()
  habilitado: string;
}
