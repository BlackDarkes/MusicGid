"use client"

import { Container, Logo } from "@/shared/ui";
import { HeaderInfo } from "../HeaderInfo/HeaderInfo";
import { SearchLine } from "@/features/search";
import { HeaderNav } from "../HeaderNav/HeaderNav";
import { NAV_EL } from "../../model/constants/navElements";

export const Header = () => {
  return (
    <header>
      <HeaderInfo />
      <Container>
        <div>
          <Logo />
          <SearchLine />
          <HeaderNav items={NAV_EL} />
        </div>
      </Container>
    </header>
  );
}