"use client";

import { HeaderInfo } from "../HeaderInfo/HeaderInfo";
import { NAV_EL } from "../../model/constants/navElements";
import { HeaderBase } from "../HeaderBase/HeaderBase";

export const Header = () => {
  return (
    <header>
      <HeaderInfo />
      <HeaderBase navEl={NAV_EL} />
    </header>
  );
};
