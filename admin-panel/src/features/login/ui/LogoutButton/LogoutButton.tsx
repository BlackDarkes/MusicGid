import { Button } from "@/shared/ui";
import { useAuthStore } from "../../model/useAuthStore";

export const LogoutButton = () => {
  const { logout } = useAuthStore();

  return (
    <Button onClick={logout}>Выйти</Button>
  );
}