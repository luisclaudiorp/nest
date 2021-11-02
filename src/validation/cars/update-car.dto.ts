import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsString, Max, Min } from 'class-validator';
import { Acessorio } from '../../model/acessorios.entity';
import { CreateCarDto } from './create-car.dto';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @ApiProperty()
  @JoiSchema(Joi.string().trim())
  @IsString()
  modelo: string;

  @ApiProperty()
  @JoiSchema(Joi.string().trim())
  @IsString()
  cor: string;

  @ApiProperty()
  @JoiSchema(Joi.number().integer().min(1950).max(2022))
  @IsInt()
  @Min(1950)
  @Max(2022)
  ano: number;

  @ApiProperty()
  @JoiSchema(Joi.object())
  acessorios: Acessorio[];

  @ApiProperty()
  @JoiSchema(Joi.number())
  @IsInt()
  quantidadePassagerios: number;
}
