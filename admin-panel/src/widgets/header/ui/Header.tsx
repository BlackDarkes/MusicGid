import { Container } from "@/shared/ui";
import { NAV_ELEMENTS } from "../model/constants/navElements";
import { HeaderNav } from "./HeaderNav";
import { Link } from "react-router";

export const Header = () => {
  return (
    <header className="bg-card py-8 text-card-foreground border-b">
      <Container className="flex justify-between items-center">
        <h1 className="text-[clamp(28px,4vw,32px)] font-semibold"><Link to="/">AdminPanel</Link></h1>

        <HeaderNav navElements={NAV_ELEMENTS} />
      </Container>
    </header>
  );
}