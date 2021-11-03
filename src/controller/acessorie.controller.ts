import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
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
import { Request } from 'express';

@Controller('/api/v1/car')
@ApiTags('Acessorie')
export class AcessorieController {
  constructor(private readonly acessorieService: AcessorieService) {}

  @Get(':id/acessorios/:id')
  get(@Req() request: Request): Promise<Acessorio[]> {
    console.log(request);
    return this.acessorieService.find(request);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: Acessorio })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @Patch(':id/acessorios/:id')
  update(
    @Param() id: IdAllDto,
    @Body() updateAcessorieDto: UpdateAcessorieDto,
  ) {
    return this.acessorieService.update(id, updateAcessorieDto);
  }
}
