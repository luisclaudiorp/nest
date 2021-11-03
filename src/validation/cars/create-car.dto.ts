import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, Min } from 'class-validator';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';
import { Acessorio } from '../../model/acessories.entity';

export class CreateCarDto {
  @ApiProperty()
  @JoiSchema(Joi.string().trim().alphanum().trim().required())
  @IsString()
  modelo: string;

  @ApiProperty()
  @JoiSchema(Joi.string().trim().required())
  @IsString()
  cor: string;

  @ApiProperty()
  @JoiSchema(Joi.number().integer().min(1950).max(2022).required())
  @IsInt()
  @Min(1950)
  @Max(2022)
  ano: number;

  @ApiProperty()
  @JoiSchema(Joi.array().required())
  acessorios: Acessorio[];

  @ApiProperty()
  @JoiSchema(Joi.number().required())
  @IsInt()
  quantidadePassagerios: number;
}
