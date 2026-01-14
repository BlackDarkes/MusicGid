import { Link } from "react-router";
import type { INavElement } from "../model/types/navElement.interface";
import { Button } from "@/shared/ui";

interface IHeaderNavProps {
  navElements: INavElement[],
}
  
export const HeaderNav = ({ navElements }: IHeaderNavProps) => {
  return (
    <ul className="flex gap-x-[clamp(30px,4vw,50px)]">
      { navElements.map((item) => (
        <li key={item.id} className="w-fit">
          <Button variant={"link"} size={"sm"} asChild>
            <Link to={item.link} className="text-[clamp(16px,4vw,18px)]">{item.elem}</Link>
          </Button>
        </li>
      )) }
    </ul>
  );
}