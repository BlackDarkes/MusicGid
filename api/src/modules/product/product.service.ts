import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { FilterDto } from "./common/dto/filter.dto";
import { CreateDto } from "./common/dto/create.dto";

@Injectable()
export class ProductService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAllProducts(filters: FilterDto) {
		const {
			categoryId,
			brandId,
			typeId,
			maxPrice,
			minPrice,
			search,
			isActive = true,
			page = 1,
			limit = 20,
		} = filters || {};

		const skip = (page - 1) * limit;

		const where: any = {};

		if (categoryId) where.categoryId = categoryId;
		if (brandId) where.brandId = brandId;
		if (typeId) where.typeId = typeId;
		if (isActive !== undefined) where.isActive = isActive;

		if (maxPrice !== undefined || maxPrice !== undefined) {
			if (maxPrice !== undefined) where.maxPrice = maxPrice;
			if (minPrice !== undefined) where.minPrice = minPrice;
		}

		if (search) {
			where.name = {
				container: search,
				mode: "insensitive" as any,
			};
		}

		const [products, total] = await Promise.all([
			this.prismaService.product.findMany({
				where,
				include: {
					brands: true,
					categories: true,
					instrumentTypes: true,
				},
				skip,
				take: limit,
				orderBy: {
					createdAt: "desc",
				},
			}),
			this.prismaService.product.count({ where }),
		]);

		return {
			products,
			pagination: {
				page,
				limit,
				total,
				pages: Math.ceil(total / limit),
			},
		};
	}

	async getProductById(productId: string) {
		const product = await this.prismaService.product.findUnique({
			where: {
				id: productId,
			},
			include: {
				brands: true,
				categories: {
					select: {
						id: true,
						name: true,
					},
				},
				instrumentTypes: true,
				comments: {
					include: {
						user: {
							select: {
								id: true,
								name: true,
								avatar: true,
							},
						},
					},
					orderBy: {
						createdAt: "desc",
					},
				},
			},
		});

		if (!product) {
			throw new BadRequestException("Продукт не найден!");
		}

		return product;
	}

	async create(dto: CreateDto) {
		const [category, brand, instrumentType] = await Promise.all([
			this.prismaService.category.findFirst({
				where: { name: dto.category },
			}),
			this.prismaService.brand.findFirst({
				where: {
					name: {
						equals: dto.brand,
						mode: "insensitive" as any,
					},
				},
			}),
			this.prismaService.instrumentType.findFirst({
				where: {
					type: {
						equals: dto.type,
						mode: "insensitive" as any,
					},
				},
			}),
		]);

    if (!category) {
      throw new BadRequestException("Такой категории не существует!");
    }

    if (!brand) {
      throw new BadRequestException("Такого бренда не существует!");
    }

    if (!instrumentType) {
      throw new BadRequestException("Такого типа инструментов не существует!");
    }

    if (dto.price < 0) {
      throw new BadRequestException("Цена не может быть отрицательной!");
    }

    if (dto.count < 0) {
      throw new BadRequestException("Количество не может быть меньше 0!");
    }

    return await this.prismaService.product.create({
      data: {
        categoryId: category.id,
        brandId: brand.id,
        image: dto.image,
        name: dto.name,
        typeId: instrumentType.id,
        price: dto.price,
        star: 0,
        specifications: dto.specifications,
        count: dto.count,
        about: dto.about,
      },
      include: {
        categories: true,
        brands: true,
        instrumentTypes: true,
      } 
    })
	}
}
