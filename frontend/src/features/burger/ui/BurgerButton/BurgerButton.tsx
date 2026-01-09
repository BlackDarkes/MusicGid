"use client"

import { useStore } from "@/app/store/store";
import styles from "./BurgerButton.module.scss";

export const BurgerButton = () => {
  const { isOpenBurger, handleOpen } = useStore()

  return (
    <button 
      className={`${styles.button} ${isOpenBurger ? styles.active : ""}`}
      onClick={handleOpen}>
      <span className={`${styles.buttonLine} ${isOpenBurger ? styles.active : ""}`} />
    </button>
  );
}