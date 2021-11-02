import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Acessorio } from '../../model/acessorios.entity';
import { CreateCarDto } from './create-car.dto';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @ApiProperty()
  @JoiSchema(Joi.string().trim().optional())
  @IsString()
  @IsOptional()
  modelo: string;

  @ApiProperty()
  @JoiSchema(Joi.string().trim().optional())
  @IsString()
  @IsOptional()
  cor: string;

  @ApiProperty()
  @JoiSchema(Joi.number().integer().min(1950).max(2022).optional())
  @IsInt()
  @Min(1950)
  @Max(2022)
  @IsOptional()
  ano: number;

  @ApiProperty()
  @JoiSchema(Joi.object().optional())
  @IsOptional()
  acessorios: Acessorio[];

  @ApiProperty()
  @JoiSchema(Joi.number().optional())
  @IsInt()
  @IsOptional()
  quantidadePassagerios: number;
}
