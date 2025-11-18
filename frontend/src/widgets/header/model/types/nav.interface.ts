import { FC, SVGProps } from "react";

export interface INavItem {
  id: number;
  icon: FC<SVGProps<SVGSVGElement>>;
  name: string;
  link?: string;
}