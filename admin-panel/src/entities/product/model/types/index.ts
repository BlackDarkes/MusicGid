export interface IProduct {
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