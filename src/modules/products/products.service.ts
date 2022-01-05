import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from 'src/core/constants';
import { ProductDto } from './dto/product.dto';
import { Product as ProductEntity } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRespository: typeof ProductEntity,
  ) {}

  async create(product: ProductDto): Promise<ProductEntity> {
    return await this.productRespository.create({ ...product });
  }

  async getAll(): Promise<ProductEntity[]> {
    return await this.productRespository.findAll();
  }

  async getById(id: number): Promise<ProductEntity> {
    return await this.productRespository.findOne({ where: { id } });
  }

  async update(id: number, data: ProductDto): Promise<ProductEntity | null> {
    const [_numberOfAffectedRows, updatedRow] =
      await this.productRespository.update(
        { ...data },
        { where: { id }, returning: true },
      );

    if ((updatedRow as unknown as number) === 0) {
      return null;
    }

    const updatedProduct = await this.getById(id);

    return updatedProduct;
  }

  async delete(id: number): Promise<any> {
    return await this.productRespository.destroy({ where: { id } });
  }
}
