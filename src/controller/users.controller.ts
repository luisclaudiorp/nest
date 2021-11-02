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
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../validation/users/create-user.dto';
import { UpdateUserDto } from '../validation/users/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../model/user.entity';
import { JoiPipe } from 'nestjs-joi';
import { paginatedSerialize } from 'src/serialize/serialize';
import { GetUserDto } from 'src/validation/users/get-user.dto';
import { IdUserDto } from 'src/validation/users/id-user.dto';

@Controller('api/v1/people')
@ApiTags('People')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: GetUserDto, isArray: true })
  @Get('')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 100,
    @Query() query: GetUserDto,
  ): Promise<object> {
    const options = {
      page,
      limit,
    };
    const result = await this.usersService.paginate(options, query);
    return paginatedSerialize(result);
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: User })
  @Get(':id')
  findOne(@Param('id') id: IdUserDto) {
    return this.usersService.findOneById(+id);
  }

  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse()
  @Post()
  async create(@Body(JoiPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @Patch(':id')
  update(
    @Param('id') id: IdUserDto,
    @Body(JoiPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @Delete(':id')
  remove(@Param('id') id: IdUserDto) {
    return this.usersService.remove(+id);
  }
}
