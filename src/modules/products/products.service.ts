import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from 'src/core/constants';
import { User } from '../users/user.entity';
import { ProductDto } from './dto/product.dto';
import { Product as ProductEntity } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRespository: typeof ProductEntity,
  ) {}

  async create(product: ProductDto, userId: number): Promise<ProductEntity> {
    return await this.productRespository.create({ ...product, userId });
  }

  async getAll(): Promise<ProductEntity[]> {
    return this.productRespository.findAll();
  }

  async getById(id: number): Promise<ProductEntity> {
    return this.productRespository.findOne({
      where: { id },
      attributes: { exclude: ['userId'] },
      include: { model: User, attributes: { exclude: ['password'] } },
    });
  }

  async update(
    id: number,
    data: ProductDto,
    userId: number,
  ): Promise<ProductEntity | null> {
    const [_numberOfAffectedRows, updatedRow] =
      await this.productRespository.update(
        { ...data },
        { where: { id, userId }, returning: true },
      );

    if ((updatedRow as unknown as number) === 0) {
      return null;
    }

    const updatedProduct = await this.getById(id);

    return updatedProduct;
  }

  async delete(id: number, userId: number): Promise<any> {
    return await this.productRespository.destroy({ where: { id, userId } });
  }
}
