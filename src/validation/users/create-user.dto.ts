import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { CREATE, JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreateUserDto {
  @ApiProperty()
  @JoiSchema(Joi.string().trim().alphanum().min(2).max(30).required())
  @JoiSchema([CREATE], Joi.string().trim().alphanum().min(2).max(30).required())
  @IsString()
  @MinLength(3)
  nome: string;

  @ApiProperty()
  @JoiSchema(Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required())
  @JoiSchema(
    [CREATE],
    Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  )
  @IsString()
  @MinLength(6)
  senha: string;

  @ApiProperty()
  @JoiSchema(Joi.string().trim().length(14).required())
  @JoiSchema([CREATE], Joi.string().trim().length(14).required())
  @IsString()
  cpf: string;

  @ApiProperty()
  @JoiSchema(Joi.string().trim().required())
  @JoiSchema([CREATE], Joi.string().trim().required())
  @IsString()
  data_nascimento: string;

  @ApiProperty()
  @JoiSchema(
    Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'br'] },
      })
      .required(),
  )
  @JoiSchema(
    [CREATE],
    Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'br'] },
      })
      .required(),
  )
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @JoiSchema(Joi.string().trim().valid('sim', 'nao').required())
  @JoiSchema([CREATE], Joi.string().trim().valid('sim', 'nao').required())
  @IsString()
  habilitado: string;
}
