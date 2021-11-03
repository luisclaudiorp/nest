import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class IdAllDto {
  @ApiProperty()
  @JoiSchema(Joi.number())
  @IsNumberString()
  id: number;
}
