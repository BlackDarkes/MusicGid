"use client";

import Link from "next/link";
import { INavItem } from "../../model/types/nav.interface";
import { Button } from "@/shared/ui";
import { memo } from "react";

interface IHeaderNavItemProps {
  item: INavItem;
}

const HeaderNavItem = memo(
  ({ item: { icon: Icon, name, link } }: IHeaderNavItemProps) => {
    return (
      <li>
        {link ? (
          <Link href={link ? link : ""}>
            <Icon />
            {name}
          </Link>
        ) : (
          <Button>
            <Icon />
            {name}
          </Button>
        )}
      </li>
    );
  }
);

HeaderNavItem.displayName = "HeaderNavItem";
export { HeaderNavItem };
