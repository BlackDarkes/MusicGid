"use client"

import { Container, Logo } from "@/shared/ui";
import { HeaderInfo } from "../HeaderInfo/HeaderInfo";
import { SearchLine } from "@/features/search";
import { HeaderNav } from "../HeaderNav/HeaderNav";

export const Header = () => {
  return (
    <header>
      <Container>
        <HeaderInfo />

        <div>
          <Logo />
          <SearchLine />
          <HeaderNav items={["Войти", "Избранное", "Корзина", "Тема"]} />
        </div>
      </Container>
    </header>
  );
}