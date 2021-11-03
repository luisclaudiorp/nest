import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';
import * as Joi from 'joi';
import { JoiSchema, UPDATE } from 'nestjs-joi';

export class UpdateAcessorieDto {
  @ApiProperty()
  @JoiSchema(Joi.string().trim().alphanum().min(2).optional())
  @JoiSchema([UPDATE], Joi.string().trim().alphanum().min(2).optional())
  @IsString()
  @MinLength(3)
  @IsOptional()
  descricao: string;
}
