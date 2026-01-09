"use client";

import Link from "next/link";
import styles from "./HeaderInfo.module.scss";
import { Container } from "@/shared/ui";

export const HeaderInfo = () => {
  return (
    <div className={styles.info}>
      <Container className={styles.infoContainer}>
        <Link href={"https://2gis.ru/ekaterinburg/geo/1267273050358323"} className={styles.infoLink} target="_blank">
          Г. Екатеринбург ул. Академика Шварца д. 14
        </Link>

        <Link href="tel:+71234567890" className={styles.infoLink}>+7 (123) 456 78-90</Link>
      </Container>
    </div>
  );
};
