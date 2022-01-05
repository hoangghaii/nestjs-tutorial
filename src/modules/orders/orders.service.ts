import { Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY } from 'src/core/constants';
import { OrderDetailsService } from '../order-details/order-details.service';
import { User } from '../users/user.entity';
import { OrderDto } from './dto/order.dto';
import { Order as OrderEntity } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRespository: typeof OrderEntity,
    private readonly orderDetailService: OrderDetailsService,
  ) {}

  async create(order: OrderDto, userId: number): Promise<any> {
    const { cartList, ...result } = order;
    const newOrder = await this.orderRespository.create({ ...result, userId });

    const orderId = newOrder.id;

    cartList.forEach(async (cart) => {
      await this.orderDetailService.create({
        orderId,
        ...cart,
        userId,
      });
    });

    return await this.findById(orderId);
  }

  async findById(orderId: number): Promise<any> {
    const order = await this.orderRespository.findByPk(orderId, {
      attributes: { exclude: ['userId'] },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
    const orderDetailList = await this.orderDetailService.findByOrderId(
      orderId,
    );

    if (!order) {
      return null;
    }

    const orderDetail = {
      ...order['dataValues'],
      cartList: orderDetailList,
    };

    return orderDetail;
  }

  async findByUser(userId: number): Promise<any> {
    const orderList = await this.orderRespository.findAll({
      where: { userId },
      attributes: { exclude: ['userId'] },
    });

    const orderDetailList = await this.orderDetailService.findByUser(userId);

    console.log(orderList);
    return orderDetailList;

    // if (!order) {
    //   return null;
    // }

    // const orderId = order.id;
    // const orderDetailList = await this.orderDetailService.findByOrderId(
    //   orderId,
    // );

    // const orderDetail = {
    //   ...order['dataValues'],
    //   cartList: orderDetailList,
    // };

    // return orderDetail;
  }
}
