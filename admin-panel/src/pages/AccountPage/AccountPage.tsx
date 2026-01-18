import { LogoutButton } from "@/features/login";
import { Button } from "@/shared/ui";
import { useEffect } from "react";

export const AccountPage = () => {
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  const handleTheme = () => {
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'light' : 'dark');

    document.body.classList.toggle('dark');
  }

  return (
    <>
      <h1>Account PAGE</h1>

      <Button onClick={handleTheme} variant={"outline"}>
        Сменить тему
      </Button>

      <LogoutButton />
    </>
  );
}