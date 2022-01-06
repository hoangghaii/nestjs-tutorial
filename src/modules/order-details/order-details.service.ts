import { Inject, Injectable } from '@nestjs/common';
import { ORDER_DETAIL_REPOSITORY } from 'src/core/constants';
import { Order } from '../orders/order.entity';
import { Product } from '../products/product.entity';
import { User } from '../users/user.entity';
import { OrderDetailUpdateDto } from './dto/order-detail-update.dto';
import { OrderDetailDto } from './dto/order-detail.dto';
import { OrderDetail as OrderDetailEntity } from './order-detail.entity';

@Injectable()
export class OrderDetailsService {
  constructor(
    @Inject(ORDER_DETAIL_REPOSITORY)
    private readonly orderDetailRespository: typeof OrderDetailEntity,
  ) {}

  async create(orderDetail: OrderDetailDto): Promise<OrderDetailEntity> {
    return await this.orderDetailRespository.create(orderDetail);
  }

  async findById(id: number): Promise<OrderDetailEntity> {
    return await this.orderDetailRespository.findOne({
      where: { id },
      attributes: { exclude: ['orderId', 'productId'] },
      include: Product,
    });
  }

  async findByOrderId(orderId: number): Promise<OrderDetailEntity[]> {
    return await this.orderDetailRespository.findAll({
      where: { orderId },
      attributes: { exclude: ['orderId', 'productId'] },
      include: Product,
    });
  }

  async updateById(
    id: number,
    orderId: number,
    data: OrderDetailUpdateDto,
  ): Promise<OrderDetailEntity | null> {
    const [_numberOfAffectedRows, updatedRow] =
      await this.orderDetailRespository.update(
        { ...data },
        { where: { id, orderId }, returning: true },
      );

    if ((updatedRow as unknown as number) === 0) {
      return null;
    }

    const updatedProduct = await this.findById(id);

    return updatedProduct;
  }

  async delete(id: number): Promise<any> {
    return await this.orderDetailRespository.destroy({ where: { id } });
  }
}
