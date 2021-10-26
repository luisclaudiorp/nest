import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { Car } from './entities/car.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('/api/v1/car')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Car })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Car, isArray: true })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Car })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOneById(+id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Car })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id, updateCarDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Car })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
