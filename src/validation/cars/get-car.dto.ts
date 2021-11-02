import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class GetCarDto {
  @ApiProperty({ required: false })
  @JoiSchema(Joi.string().trim().alphanum().trim().required().optional())
  @IsString()
  @IsOptional()
  modelo: string;

  @ApiProperty({ required: false })
  @JoiSchema(Joi.string().trim().required().optional())
  @IsString()
  @IsOptional()
  cor: string;

  @ApiProperty({ required: false })
  @JoiSchema(Joi.number().integer().min(1950).max(2022).required().optional())
  @IsInt()
  @Min(1950)
  @Max(2022)
  @IsOptional()
  ano: number;

  @ApiProperty({ required: false })
  @JoiSchema(Joi.number().required().optional())
  @IsInt()
  @IsOptional()
  quantidadePassagerios: number;
}
