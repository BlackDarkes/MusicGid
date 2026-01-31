import { type infer as zInfer, object, string, number, array } from "zod";

const updateSchema = object({
  id: string(),
  category: string(),
  brand: string(),
  image: string(),
  name: string(),
  type: string(),
  price: number(),
  specifications: array(string()),
  count: number(),
  about: string(),
});

type TypeUpdateProductSchema = zInfer<typeof updateSchema>;

export { type TypeUpdateProductSchema, updateSchema };