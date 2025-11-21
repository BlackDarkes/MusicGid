"use client"

import IconLogo from "/public/favicon.svg";
import styles from "./Logo.module.scss";

export const Logo = () => {
  return (
    <p className={styles.logo}>
      <IconLogo />
      MusicGid
    </p>
  );
}