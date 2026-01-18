import { Button } from "@/shared/ui";
import { useAuthStore } from "../../model/useAuthStore";
import { useNavigate } from "react-router";

export const LogoutButton = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    navigate("/admin/login");
  }

  return (
    <Button onClick={handleLogout}>Выйти</Button>
  );
}