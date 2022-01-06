import { Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY } from 'src/core/constants';
import { OrderDetailsService } from '../order-details/order-details.service';
import { User } from '../users/user.entity';
import { OrderUpdateDto } from './dto/order-update.dto';
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

    const orderId = await newOrder.id;

    cartList.forEach(async (cart) => {
      await this.orderDetailService.create({
        orderId,
        ...cart,
      });
    });
  }

  async findById(orderId: number): Promise<any> {
    const [order, orderDetailList] = await Promise.all([
      this.orderRespository.findByPk(orderId, {
        attributes: { exclude: ['userId'] },
        include: [{ model: User, attributes: { exclude: ['password'] } }],
      }),
      this.orderDetailService.findByOrderId(orderId),
    ]);

    if (!order) {
      return null;
    }

    // console.log(orderDetailList);

    const orderDetail = {
      ...order['dataValues'],
      cartList: orderDetailList,
    };

    return orderDetail;
  }

  async findByUser(userId: number): Promise<any> {
    const orderList = await this.orderRespository.findAll({
      where: { userId },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
      ],
      attributes: { exclude: ['userId'] },
    });

    return orderList;
  }

  async findAll(): Promise<any> {
    return this.orderRespository.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
      ],
      attributes: { exclude: ['userId'] },
    });
  }

  async update(id: number, data: OrderUpdateDto, userId: number): Promise<any> {
    const { cartList, ...result } = data;
    const [_numberOfAffectedRows, updatedRow] =
      await this.orderRespository.update(
        { ...result },
        { where: { id, userId } },
      );

    if ((updatedRow as unknown as number) === 0) {
      return null;
    }

    const orderId = id;

    cartList.forEach(async (cart) => {
      await this.orderDetailService.updateById(cart.id, orderId, cart);
    });

    return await this.findById(orderId);
  }
}
