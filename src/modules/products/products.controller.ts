import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { editFileName } from '../upload/upload.utils';
import { User as UserEntity } from '../users/user.entity';
import { ProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async findAll() {
    return await this.productService.getAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const product = await this.productService.getById(id);

    if (!product) {
      throw new NotFoundException("This product doestn't exist");
    }

    return product;
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files/products',
        filename: editFileName,
      }),
    }),
  )
  async create(
    @Body() product: ProductDto,
    @Req() req: { user: UserEntity },
    @UploadedFile() file: Express.Multer.File,
  ) {
    const filename = file.filename;
    const createdProduct = {
      ...product,
      imageLink: `./files/products/${filename}`,
    };
    return this.productService.create(createdProduct, req.user.id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files/products',
        filename: editFileName,
      }),
    }),
  )
  async update(
    @Param('id') id: number,
    @Body() product: ProductDto,
    @Req() req: { user: UserEntity },
    @UploadedFile() file: Express.Multer.File,
  ) {
    const filename = file.filename;
    const updateProduct = {
      ...product,
      imageLink: `./files/products/${filename}`,
    };
    const updatedProduct = this.productService.update(
      id,
      updateProduct,
      req.user.id,
    );

    if (!updatedProduct) {
      throw new NotFoundException("This product doestn't exist");
    }

    return updatedProduct;
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @Req() req: { user: UserEntity },
    @Res() res: Response,
  ) {
    const deletedProduct = await this.productService.delete(id, req.user.id);

    if (!deletedProduct) {
      throw new NotFoundException("This product doestn't exist");
    }

    return res.status(HttpStatus.OK).json({ message: 'Successfully deleted' });
  }
}
