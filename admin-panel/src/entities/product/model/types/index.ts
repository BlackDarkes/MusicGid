interface IProduct {
  id: string;
  categoryId: number;
  brandId: number;
  image: string;
  isFavorite: boolean;
  name: string;
  typeId: string; 
  price: number;
  star: number;
  specifications: string[];
  count: number;
  idActive: number;
  about: string;
}

interface IPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface IProductResponse {
  products: IProduct[],
  pagination: IPagination;
}

export type { IProduct, IPagination, IProductResponse };