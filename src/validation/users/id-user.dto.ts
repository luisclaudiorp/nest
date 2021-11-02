import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class IdUserDto {
  @ApiProperty()
  @JoiSchema(Joi.number())
  @IsNumber()
  id: number;
}
