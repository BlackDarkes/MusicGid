import { type infer as zInfer, object, string, array, coerce, file } from "zod";

const createProductSchema = object({
  category: string().min(4, "Минимум 4 символа"),
  brand: string().min(3, "Минимум 3 символа"),
  image: file(),
  name: string().min(3, "Минимум 3 символа"),
  type: string().min(3, "Минимум 3 символа"),
  price: coerce.number().min(1, "Цена должна быть больше 0"),
  count: coerce.number().min(0, "Количество не может быть отрицательным"),
  about: string().min(15, "Описание должно быть не менее 15 символов"),
  specifications: array(string()).default([]),
});

type TypeCreateProductSchema = zInfer<typeof createProductSchema>;

export { type TypeCreateProductSchema, createProductSchema };