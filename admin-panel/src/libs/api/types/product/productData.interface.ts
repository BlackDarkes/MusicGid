export interface IProductData {
  category: string;
  brand: string;
  image: File | string;
  name: string;
  type: string;
  price: number;
  specifications: string[];
  count: number;
  about: string;
}