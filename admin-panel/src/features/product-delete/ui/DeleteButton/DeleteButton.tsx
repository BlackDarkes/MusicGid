import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui";
import { Button } from "@/shared/ui";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDeleteProduct } from "../../api/useDeleteProduct";

interface IDeleteButtonProps {
  id: string;
}

export const DeleteButton = ({ id }: IDeleteButtonProps) => {
  const { mutate, isPending } = useDeleteProduct();

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        toast.success("Продукт успешно удален!");
      },
      onError: () => {
        toast.error("Произошла ошибка при удалении!");
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"icon"}
          className="text-destructive cursor-pointer"
          disabled={isPending}
        >
          {isPending ? (
            <span className="animate-spin mr-2">🌀</span>
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Вы действительно хотите удалить продукт?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Отмена</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
          >Удалить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
