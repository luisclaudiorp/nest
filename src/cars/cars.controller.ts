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
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { paginatedSerialize } from 'src/serialize/serialize';

@Controller('/api/v1/car')
@ApiTags('Car')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiOkResponse({ type: Car, isArray: true })
  @ApiQuery({ name: 'query parans', required: false })
  @Get('')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query() query: any,
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
  findOne(@Param('id') id: string) {
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
  @ApiCreatedResponse({ type: Car })
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: Car })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id, updateCarDto);
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Car })
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: Car })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
