import { Link } from "react-router";
import type { INavElement } from "../model/types/navElement.interface";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/shared/ui";

interface IHeaderNavProps {
  navElements: INavElement[],
}
  
export const HeaderNav = ({ navElements }: IHeaderNavProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-4">
        { navElements.map((item) => (
          <NavigationMenuItem key={item.id}>
            <Link to={item.link} className="text-card-foreground hover:text-card-foreground/70">
              { item.elem }
            </Link>
          </NavigationMenuItem>
        )) }
      </NavigationMenuList>
    </NavigationMenu>
  );
}