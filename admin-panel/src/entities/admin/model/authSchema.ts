import { object, email, string, type infer as zInfer } from "zod";

const authSchema = object({
  email: email("Некорректный email!"),
  password: string().min(6, "Пароль должен быть не менее 6 символов!"),
})

type TypeAuthSchema = zInfer<typeof authSchema>

export { type TypeAuthSchema, authSchema }