"use client"

import Link from "next/link";

export const HeaderInfo = () => {
  return (
    <div>
      <Link href={"https://2gis.ru/ekaterinburg/geo/1267273050358323"}>Г. Екатеринбург ул. Академика Шварца д. 14</Link>

      <Link href="tel:+71234567890">+7 (123) 456 78-90</Link>
    </div>
  );
}