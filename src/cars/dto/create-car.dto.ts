import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, Min } from 'class-validator';

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
  @IsString()
  acessorios: string;

  @ApiProperty()
  @IsInt()
  quantidadePassagerios: string;
}
