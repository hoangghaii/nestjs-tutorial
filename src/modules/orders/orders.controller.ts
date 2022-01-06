import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { User as UserEntity } from '../users/user.entity';
import { OrderUpdateDto } from './dto/order-update.dto';
import { OrderDto } from './dto/order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  async create(
    @Body() order: OrderDto,
    @Req() req: { user: UserEntity },
    @Res() res: Response,
  ) {
    await this.orderService.create(order, req.user.id);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Create successfully' });
  }

  @Get('/mine')
  async createdByMe(@Req() req: { user: UserEntity }) {
    const cart = await this.orderService.findByUser(req.user.id);

    if (!cart) {
      throw new NotFoundException("This cart doesn't exist");
    }

    return cart;
  }

  @Get('/user/:id')
  async findByUser(@Param('id') id: number) {
    const cart = await this.orderService.findByUser(id);

    if (!cart) {
      throw new NotFoundException("This cart doesn't exist");
    }

    return cart;
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const cart = await this.orderService.findById(id);

    if (!cart) {
      throw new NotFoundException("This cart doesn't exist");
    }

    return cart;
  }

  @Get()
  async findAll() {
    return await this.orderService.findAll();
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() data: OrderUpdateDto,
    @Req() req: { user: UserEntity },
  ) {
    return await this.orderService.update(id, data, req.user.id);
  }
}
