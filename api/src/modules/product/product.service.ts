import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';
import { CreateDto } from './common/dto/create.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async getAllProducts(): Promise<Product[] | null> {
    return await this.prismaService.product.findMany();
  }

  async getById(id: string): Promise<Product | null> {
    return await this.prismaService.product.findUnique({ where: { id } });
  }

  async getByName(name: string): Promise<Product | null> {
    return await this.prismaService.product.findFirst({ where: { name } });
  }

  async create(dto: CreateDto) {
    const product = this.getByName(dto.name);

    if (!product) {
      throw new NotFoundException("Продукт с данным названием существует!");
    }

    // await this.prismaService.product.create(dto);
  }
}
