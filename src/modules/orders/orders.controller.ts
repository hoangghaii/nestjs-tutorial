import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { User as UserEntity } from '../users/user.entity';
import { OrderDto } from './dto/order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  async create(@Body() order: OrderDto, @Req() req: { user: UserEntity }) {
    return await this.orderService.create(order, req.user.id);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const cart = await this.orderService.findById(id);

    if (!cart) {
      throw new NotFoundException("This cart doesn't exist");
    }

    return cart;
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
}
