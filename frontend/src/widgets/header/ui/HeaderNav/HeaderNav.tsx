"use client";

import Link from "next/link";
import { INavItem } from "../../model/types/nav.interface";
import { Button } from "@/shared/ui";
import { memo } from "react";

interface IHeaderNavProps {
  items: INavItem[];
}

const HeaderNav = memo(({ items }: IHeaderNavProps) => {
  return (
    <ul>
      {items.map(({ id, icon: Icon, name, link }) => (
        <li key={id}>
          { link ? (
            <Link href={link ? link : ""}>
              <Icon />
              {name}
            </Link>
          ) : (
            <Button>
              <Icon />
              {name}
            </Button>
          ) }
        </li>
      ))}
    </ul>
  );
});

HeaderNav.displayName = "HeaderNav";
export { HeaderNav };