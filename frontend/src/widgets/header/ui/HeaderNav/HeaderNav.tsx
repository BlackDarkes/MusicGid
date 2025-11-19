"use client";

import { INavItem } from "../../model/types/nav.interface";
import { HeaderNavItem } from "../HeaderNavItem/HeaderNavItem";

interface IHeaderNavProps {
  items: INavItem[];
}

const HeaderNav = ({ items }: IHeaderNavProps) => {
  return (
    <ul>
      {items.map((item) => (
        <HeaderNavItem item={item} key={item.id} />
      ))}
    </ul>
  );
};

HeaderNav.displayName = "HeaderNav";
export { HeaderNav };
