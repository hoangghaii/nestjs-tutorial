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
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { editFileName } from '../upload/upload.utils';
import { Role } from '../users/role.enum';
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

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
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
    @UploadedFile() file: Express.Multer.File,
  ) {
    const filename = file.filename;
    const createdProduct = {
      ...product,
      imageLink: `./files/products/${filename}`,
    };
    return this.productService.create(createdProduct);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
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
    @UploadedFile() file: Express.Multer.File,
  ) {
    const filename = file.filename;
    const updateProduct = {
      ...product,
      imageLink: `./files/products/${filename}`,
    };
    const updatedProduct = this.productService.update(id, updateProduct);

    if (!updatedProduct) {
      throw new NotFoundException("This product doestn't exist");
    }

    return updatedProduct;
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    const deletedProduct = await this.productService.delete(id);

    if (!deletedProduct) {
      throw new NotFoundException("This product doestn't exist");
    }

    return res.status(HttpStatus.OK).json({ message: 'Successfully deleted' });
  }
}
