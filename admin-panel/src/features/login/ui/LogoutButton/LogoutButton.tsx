import { Button } from "@/shared/ui";
import { useAuthStore } from "../../model/useAuthStore";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const LogoutButton = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    toast.message("Вы вышли из аккаунта!");

    navigate("/admin/login");
  }

  return (
    <Button onClick={handleLogout}>Выйти</Button>
  );
}