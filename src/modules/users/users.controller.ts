import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserDto } from './dto/user.dto';
import { Role } from './role.enum';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: number) {
    // find the user with this id
    const user = await this.userService.findOneById(id);

    // if the user doesn't exit in the db, throw a 404 error
    if (!user) {
      throw new NotFoundException("This user doesn't exist");
    }

    // if user exist, return the user
    return user;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() user: UserDto) {
    // get the number of row affected and the updated user
    const { numberOfAffectedRows, updatedUser } = await this.userService.update(
      id,
      user,
    );

    // if the number of row affected is zero,
    // it means the user doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This user doesn't exist");
    }

    // return the updated user
    return updatedUser;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    // delete the user with this id
    const deleted = await this.userService.delete(id);

    // if the number of row affected is zero,
    // then the user doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This user doesn't exist");
    }

    return res.status(HttpStatus.OK).json('Successfully deleted');
  }
}
