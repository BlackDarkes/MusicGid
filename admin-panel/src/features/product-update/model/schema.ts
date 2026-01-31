import { type infer as zInfer, object, string, number } from "zod";

const updateSchema = object({
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

type TypeUpdateProductSchema = zInfer<typeof updateSchema>;

export { type TypeUpdateProductSchema, updateSchema };