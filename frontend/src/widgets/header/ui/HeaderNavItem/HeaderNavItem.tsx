"use client";

import { memo } from "react";
import Link from "next/link";
import type { INavItem } from "@/widgets/header/model/types/nav.interface";
import { Button } from "@/shared/ui";
import styles from "./HeaderNavItem.module.scss";

interface IHeaderNavItemProps {
  item: INavItem;
}

const HeaderNavItem = memo(
  ({ item: { icon: Icon, name, link } }: IHeaderNavItemProps) => {
    return (
      <li className={styles.item}>
        {link ? (
          <Link href={link ? link : ""} className={styles.itemLink}>
            <Icon />
            {name}
          </Link>
        ) : (
          <Button className={styles.itemLink}>
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
