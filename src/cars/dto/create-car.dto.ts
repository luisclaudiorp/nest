import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, Min } from 'class-validator';
import { Acessorio } from '../entities/acessorios.entity';

export class CreateCarDto {
  @ApiProperty()
  @IsString()
  modelo: string;

  @ApiProperty()
  @IsString()
  cor: string;

  @ApiProperty()
  @IsInt()
  @Min(1950)
  @Max(2022)
  ano: number;

  @ApiProperty()
  // @IsString()
  acessorios: Acessorio[];

  @ApiProperty()
  @IsInt()
  quantidadePassagerios: string;
}
