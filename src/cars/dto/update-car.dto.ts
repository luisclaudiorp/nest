import { PartialType } from '@nestjs/swagger';
import { CreateCarDto } from './create-car.dto';

export class UpdateCarDto extends PartialType(CreateCarDto) {
  modelo: string;
  cor: string;
  ano: string;
  acessorios: string;
  quantidadePassagerios: string;
}
