import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("")
  @HttpCode(200)
  async getAll() {
    const allPosts = await this.productService.getAllProducts();

    return {
      products: allPosts,
    }
  }

  @Get(":id")
  @HttpCode(200)
  async getById(@Param("id") id: string) {
    const product = await this.productService.getById(id)

    return {
      product,
    }
  }
}
