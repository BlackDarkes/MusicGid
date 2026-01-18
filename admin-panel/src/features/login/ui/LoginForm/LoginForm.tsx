import { authSchema } from "@/entities/admin";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/ui";
import { useForm } from "react-hook-form";
import { type infer as zInfer } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../model/useAuthStore";
import { useNavigate } from "react-router";

export const LoginForm = () => {
  const form = useForm<zInfer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (values: zInfer<typeof authSchema>) => {
    await login(values);

    form.reset();

    navigate("/admin");
  };

  return (
    <div className="flex justify-center items-center w-full h-[100vh]">
      <Card className="w-[350px] mx-auto">
        <CardHeader>
          <CardTitle>Вход в админ-панель</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
              method="post"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Почта</FormLabel>
                    <FormControl>
                      <Input placeholder="Почта" type="email" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input placeholder="Пароль" type="password" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Войти
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
