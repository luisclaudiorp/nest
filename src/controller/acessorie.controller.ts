import {
  Body,
  Controller,
  Param,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Acessorio } from 'src/model/acessories.entity';
import { AcessorieService } from 'src/service/acessories.service';
import { UpdateAcessorieDto } from 'src/validation/acessories/update-acessories.dto';
import { IdAllDto } from 'src/validation/id-all.dto';

@Controller('acessories')
@ApiTags('Acessorie')
export class AcessorieController {
  constructor(private readonly acessorieService: AcessorieService) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: Acessorio })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @Patch('/api/v1/car/:id/acessorios/:id')
  @UsePipes(new ValidationPipe())
  update(
    @Param(':id') id: IdAllDto,
    @Body() updateAcessorieDto: UpdateAcessorieDto,
  ) {
    return this.acessorieService.update(+id, updateAcessorieDto);
  }
}
