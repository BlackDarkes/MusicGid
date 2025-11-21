"use client"

import { Button } from "@/shared/ui";
import IconSearch from "../../assets/searchIcon.svg";
import styles from "./SearchLine.module.scss";

export const SearchLine = () => {
  return (
    <div className={styles.search}>
      <input type="search" className={styles.searchInput} name="search" id="search" placeholder="Поиск...." />
      <Button>
        <IconSearch />
      </Button>
    </div>
  );
}