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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('api/v1/people')
@ApiTags('People')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'query parans', required: false })
  @Get('')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query() query: any,
  ): Promise<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;
    const options = {
      page,
      limit,
      route: 'api/v1/people',
    };
    return this.usersService.paginate(options, query);
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: User })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
