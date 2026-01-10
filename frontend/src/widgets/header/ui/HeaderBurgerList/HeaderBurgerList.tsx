import Link from "next/link";
import { INavItem } from "../../model/types/nav.interface";
import { memo, useEffect, useState } from "react";
import { Button } from "@/shared/ui";
import { useStore } from "@/app/store/store";
import styles from "./HeaderBurgerList.module.scss";
import { useResizeWidth } from "@/shared/hooks/useResizeWidth";

interface IHeaderBurgerListProps {
  items: INavItem[];
}

const HeaderBurgerList = memo(({ items }: IHeaderBurgerListProps) => {
  const { isOpenBurger } = useStore();
  const { width } = useResizeWidth();

  return (
    <>
      {width < 1025 ? (
        <div className={`${styles.burgerBlock} ${isOpenBurger ? styles.active : ""}`}>
          <ul className={styles.burgerBlockList}>
            {items.map(({ id, name, link, icon: Icon }) => (
              <li key={id}>
                {link ? (
                  <Link className={styles.burgerBlockLink} href={link ? link : ""}>
                    <Icon />
                    <Button>{name}</Button>
                  </Link>
                ) : (
                  <div className={styles.burgerBlockLink}>
                    <Icon />
                    <Button>{name}</Button> 
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
});

HeaderBurgerList.displayName = "HeaderBurgerList";

export { HeaderBurgerList };
