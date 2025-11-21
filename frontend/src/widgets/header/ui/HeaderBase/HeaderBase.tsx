import { Container, Logo } from "@/shared/ui";
import { INavItem } from "../../model/types/nav.interface";
import { SearchLine } from "@/features/search";
import { HeaderNav } from "../HeaderNav/HeaderNav";
import styles from "./HeaderBase.module.scss";

interface IHeaderBaseProps {
  navEl: INavItem[];
}

export const HeaderBase = ({ navEl }: IHeaderBaseProps) => {
  return (
    <Container className={styles.headerBase}>
      <div className={styles.headerBaseBlockLogo}>
        <Logo />
        <SearchLine />
      </div>
      <HeaderNav items={navEl} />
    </Container>
  );
};
