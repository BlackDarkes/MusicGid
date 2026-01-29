import { type infer as zInfer, object } from "zod";

const updateSchema = object({

});

type TypeUpdateProductSchema = zInfer<typeof updateSchema>;

export { type TypeUpdateProductSchema, updateSchema };