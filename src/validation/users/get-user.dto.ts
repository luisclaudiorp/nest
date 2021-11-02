import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class GetUserDto {
  @ApiProperty({ required: false })
  @JoiSchema(Joi.string().trim().alphanum().min(2).max(30).optional())
  @IsString()
  @IsOptional()
  nome: string;

  @ApiProperty({ required: false })
  @JoiSchema(Joi.string().trim().length(14).optional())
  @IsString()
  @IsOptional()
  cpf: string;

  @ApiProperty({ required: false })
  @JoiSchema(Joi.string().trim().required().optional())
  @IsString()
  @IsOptional()
  data_nascimento: string;

  @ApiProperty({ required: false })
  @JoiSchema(
    Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'br'] },
      })
      .optional(),
  )
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @JoiSchema(Joi.string().trim().valid('sim', 'nao').optional())
  @IsString()
  @IsOptional()
  habilitado: string;
}
