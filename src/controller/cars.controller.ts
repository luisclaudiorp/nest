import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarsService } from '../service/cars.service';
import { CreateCarDto } from '../validation/cars/create-car.dto';
import { UpdateCarDto } from '../validation/cars/update-car.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Car } from '../model/car.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { paginatedSerialize } from 'src/serialize/serialize';
import { GetCarDto } from 'src/validation/cars/get-car.dto';
import { IdCarDto } from 'src/validation/cars/id-car.dto';

@Controller('/api/v1/car')
@ApiTags('Car')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Car, isArray: true })
  @Get('')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query() query: GetCarDto,
  ): Promise<object> {
    limit = limit > 100 ? 100 : limit;
    const options = {
      page,
      limit,
    };
    const result = await this.carsService.paginate(options, query);
    return paginatedSerialize(result);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: Car })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: IdCarDto) {
    return this.carsService.findOneById(+id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Car })
  @ApiUnauthorizedResponse()
  @ApiCreatedResponse({ type: Car })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: Car })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: IdCarDto, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id, updateCarDto);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: Car })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: IdCarDto) {
    return this.carsService.remove(+id);
  }
}
