import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { FilterDto } from "./common/dto/filter.dto.js";
import { CreateDto } from "./common/dto/create.dto.js";
import { CategoryType } from "./types/index.js";
import { CategoryEnum } from "@prisma/client";

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
				where: { name: dto.category as CategoryEnum },
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
			},
		});
	}

	async update(productId: string, dto: CreateDto) {
		const product = await this.prismaService.product.findUnique({
			where: { id: productId },
		});

		if (!product) {
			throw new NotFoundException("Товар не найден!");
		}

		const updateData: any = {};

		if (dto.name !== undefined) {
			updateData.name = dto.name;
		}

		if (dto.image !== undefined) {
			updateData.image = dto.image;
		}

		if (dto.price !== undefined) {
			if (dto.price < 0) {
				throw new BadRequestException("Цена не может быть отрицательной!");
			}
			updateData.price = dto.price;
		}

		if (dto.about !== undefined) {
			updateData.about = dto.about;
		}

		if (dto.specifications !== undefined) {
			updateData.specifications = dto.specifications;
		}

		if (dto.count !== undefined) {
			if (dto.count < 0) {
				throw new BadRequestException("Количество не может быть меньше 0!");
			}
			updateData.count = dto.count;
		}

		if (
			dto.category !== undefined ||
			dto.brand !== undefined ||
			dto.type !== undefined
		) {
			const [category, brand, instrumentType] = await Promise.all([
				dto.category
					? this.prismaService.category.findFirst({
							where: { name: dto.category as CategoryEnum },
						})
					: Promise.resolve(null),
				dto.brand
					? this.prismaService.brand.findFirst({
							where: {
								name: {
									equals: dto.brand,
									mode: "insensitive" as any,
								},
							},
						})
					: Promise.resolve(null),
				dto.type
					? this.prismaService.instrumentType.findFirst({
							where: {
								type: {
									equals: dto.type,
									mode: "insensitive" as any,
								},
							},
						})
					: Promise.resolve(null),
			]);

			if (dto.category && !category) {
				throw new BadRequestException("Такой категории не существует!");
			}

			if (dto.brand && !brand) {
				throw new BadRequestException("Такого бренда не существует!");
			}

			if (dto.type && !instrumentType) {
				throw new BadRequestException(
					"Такого типа инструментов не существует!",
				);
			}

			if (category) updateData.categoryId = category.id;
			if (brand) updateData.brandId = brand.id;
			if (instrumentType) updateData.typeId = instrumentType.id;
		}

		return await this.prismaService.product.update({
			where: { id: productId },
			data: updateData,
			include: {
				categories: true,
				brands: true,
				instrumentTypes: true,
			},
		});
	}

	async createBrand(brandName: string, brandImage: string) {
		const findBrand = await this.prismaService.brand.findFirst({
			where: {
				name: brandName,
			},
		});

		if (findBrand) {
			throw new BadRequestException("Такой бренд уже существует!");
		}

		const lastBrand = await this.prismaService.brand.findFirst({
			orderBy: {
				id: "desc",
			},
		});
		const newBrandId = lastBrand?.id ? lastBrand?.id + 1 : 1;

		return this.prismaService.brand.create({
			data: {
				id: newBrandId,
				name: brandName,
				image: brandImage,
			},
		});
	}

	async createInstrumentType(type: string) {
		const findInstrumentType =
			await this.prismaService.instrumentType.findFirst({
				where: {
					type,
				},
			});

		if (findInstrumentType) {
			throw new BadRequestException("Тип инструмента уже существует!");
		}

		const lastType = await this.prismaService.instrumentType.findFirst({
			orderBy: {
				id: "desc",
			},
		});
		const lastId = lastType?.id ? lastType?.id + 1 : 1;

		return this.prismaService.instrumentType.create({
			data: {
				id: lastId,
				type,
			},
		});
	}

	async getProductByCategory(categoryName: CategoryType) {
		const category = await this.prismaService.category.findFirst({
			where: {
				name: categoryName as CategoryEnum,
			},
		});

		if (!category) {
			throw new NotFoundException(`Category "${categoryName}" not found!`);
		}

		return this.prismaService.product.findMany({
			where: {
				categoryId: category.id,
				isActive: true,
			},
			include: {
				brands: true,
				categories: true,
				instrumentTypes: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	}

	async getProductByBrand(brandName: string) {
		const brand = await this.prismaService.brand.findFirst({
			where: {
				name: {
					contains: brandName,
					mode: "insensitive" as any,
				},
			},
		});

		if (!brand) {
			throw new NotFoundException(`Brand "${brandName}" not found!`);
		}

		return this.prismaService.product.findMany({
			where: {
				brandId: brand.id,
				isActive: true,
			},
			include: {
				brands: true,
				categories: true,
				instrumentTypes: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	}
}
