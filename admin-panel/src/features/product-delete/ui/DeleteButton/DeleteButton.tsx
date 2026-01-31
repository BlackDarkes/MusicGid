
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
      }
    })
  }

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      className="text-destructive cursor-pointer"
      disabled={isPending}
      onClick={handleDelete}
    >
      { isPending ? <span className="animate-spin mr-2">🌀</span> : <Trash2 className="h-4 w-4" /> }
    </Button>
  );
}