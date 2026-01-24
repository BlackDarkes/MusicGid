/* eslint-disable @typescript-eslint/no-explicit-any */
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
  toast
} from "@/shared/ui";
import { useForm } from "react-hook-form";
import { type infer as zInfer } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../model/useAuthStore";
import { useNavigate } from "react-router";

export const LoginForm = () => {
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const form = useForm<zInfer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });


  const onSubmit = async (values: zInfer<typeof authSchema>) => {
    try {
      const serverMessage =await login(values);

      toast.message("Успешный вход!", {
        description: typeof serverMessage === "string" 
          ? serverMessage 
          : "Вы успешно вошли в админ-панель!",
      });

      navigate("/admin");
    } catch(error: any) {
      toast.error("Ошибка входа!", {
        description: error.message,
      });

      form.setValue("password", "");
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Card className="w-87.5 mx-auto">
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
                      <Input
                        placeholder="Почта"
                        type="email"
                        required
                        {...field}
                      />
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
                      <Input
                        placeholder="Пароль"
                        type="password"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
                { isLoading ? (
                  <>
                    <span className="animate-spin mr-2">🌀</span>
                    Вход...
                  </>
                ) : (
                  "Вход"
                ) }
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
