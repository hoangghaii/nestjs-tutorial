import { Inject, Injectable } from '@nestjs/common';
import { ORDER_DETAIL_REPOSITORY } from 'src/core/constants';
import { Product } from '../products/product.entity';
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
      attributes: { exclude: ['orderId', 'productId', 'userId'] },
      include: { model: Product },
    });
  }

  async findByOrderId(orderId: number): Promise<OrderDetailEntity[]> {
    return await this.orderDetailRespository.findAll({
      where: { orderId },
      attributes: { exclude: ['orderId', 'productId', 'userId'] },
      include: { model: Product },
    });
  }

  async findByUser(userId: number): Promise<OrderDetailEntity[]> {
    return await this.orderDetailRespository.findAll({
      where: { userId },
      attributes: { exclude: ['productId', 'userId'] },
      include: { model: Product },
    });
  }

  async updateById(
    id: number,
    data: OrderDetailDto,
  ): Promise<OrderDetailEntity | null> {
    const [_numberOfAffectedRows, updatedRow] =
      await this.orderDetailRespository.update(
        { ...data },
        { where: { id }, returning: true },
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
