import { INavItem } from "../types/nav.interface";
import IconUser from "../../assets/userIcon.svg";
import IconHeart from "../../assets/heartIcon.svg";
import IconShoppingCart from "../../assets/shoppingCartIcon.svg";
import IconThemeSwitch from "../../assets/themSwitchIcon.svg";

export const NAV_EL: INavItem[] = [
  {
    id: 1,
    icon: IconUser,
    name: "Войти",
  },
  {
    id: 2,
    icon: IconHeart,
    name: "Избранное",
    link: "/favorites"
  },
  {
    id: 3,
    icon: IconShoppingCart,
    name: "Корзина",
    link: "/cart",
  },
  {
    id: 4,
    icon: IconThemeSwitch,
    name: "Тема",
  },
  
]