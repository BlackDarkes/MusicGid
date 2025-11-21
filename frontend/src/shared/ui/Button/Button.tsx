import { ReactNode } from "react";
import styles from "./Button.module.scss";

interface IButtonProps {
  children: ReactNode;
  className?: string;
}
  
export const Button = ({ children, className }: IButtonProps) => {
  return (
    <button className={`${className ? className : ""} ${styles.button}`}>
      { children }
    </button>
  );
}