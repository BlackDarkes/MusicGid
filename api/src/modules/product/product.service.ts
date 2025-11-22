import { Injectable } from '@nestjs/common';
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

  async create(dto: CreateDto) {
    
  }
}
