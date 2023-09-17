import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth-user/jwt-auth.guard';

@Controller('usuario')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      const createdUser = this.usersService.create(createUserDto);
      return createdUser;
    } catch (e) {
      return e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    try {
      console.log(req.user);
      return this.usersService.findAll();
    } catch (e) {
      return e;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.usersService.findOne(id);
    } catch (e) {
      return e;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.update(id, updateUserDto);
    } catch (e) {
      return e;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(id);
    } catch (e) {
      return e;
    }
  }
}
