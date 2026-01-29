import { type infer as zInfer, object  } from "zod";

const createProductSchema = object({

});

type TypeCreateProductSchema = zInfer<typeof createProductSchema>;

export { type TypeCreateProductSchema, createProductSchema  };