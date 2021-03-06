import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Rental } from '../model/rental.entity';
import { paginatedSerializeRental } from '../serialize/serializeRental';
import { IdAllDto } from '../validation/id-all.dto';
import { GetRentalDto } from '../validation/rental/get-rental.dto';
import { RentalService } from '../service/rental.service';
import { CreateRentalDto } from '../validation/rental/create-rental.dto';
import { UpdateRentalDto } from '../validation/rental/update-rental.dto';

@Controller('api/v1/rental')
@ApiTags('Rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @ApiOkResponse({ type: Rental, isArray: true })
  @Get('')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 100,
    @Query() query: GetRentalDto,
  ): Promise<object> {
    limit = limit > 100 ? 100 : limit;
    const options = {
      page,
      limit,
    };
    const result = await this.rentalService.paginate(options, query);
    return paginatedSerializeRental(result);
  }

  @ApiOkResponse({ type: Rental })
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: Rental })
  @Get(':id')
  findOne(@Param() id: IdAllDto) {
    return this.rentalService.findOneById(id);
  }

  @ApiOkResponse({ type: Rental })
  @ApiCreatedResponse({ type: Rental })
  @ApiBadRequestResponse()
  @Post()
  create(@Body() createRentalDto: CreateRentalDto) {
    return this.rentalService.create(createRentalDto);
  }

  @ApiOkResponse({ type: Rental })
  @ApiNotFoundResponse()
  @Patch(':id')
  update(@Param() id: IdAllDto, @Body() updateRentalDto: UpdateRentalDto) {
    return this.rentalService.update(id, updateRentalDto);
  }

  @ApiOkResponse({ type: Rental })
  @ApiNotFoundResponse()
  @Delete(':id')
  remove(@Param() id: IdAllDto) {
    return this.rentalService.remove(id);
  }
}
