import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column()
  @ApiProperty()
  acessorios: string;

  @Column()
  @ApiProperty()
  quantidadePassagerios: string;
}
