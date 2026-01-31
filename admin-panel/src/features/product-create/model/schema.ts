import { type infer as zInfer, object, string, number,   } from "zod";

const createProductSchema = object({
  category: string(),
  brand: string(),
  image: string(),
  name: string(),
  type: string(),
  price: number(),
  specifications: string(),
  count: number(),
  about: string(),
});

type TypeCreateProductSchema = zInfer<typeof createProductSchema>;

export { type TypeCreateProductSchema, createProductSchema };