import { Button } from "@/shared/ui";
import IconSearch from "../../assets/searchIcon.svg";
import styles from "./MobileButtonSearch.module.scss";

export const MobileButtonSearch = () => {
  return (
    <Button className={styles.button}>
      <IconSearch />
    </Button>
  );
}