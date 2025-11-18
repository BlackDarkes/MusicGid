import { ReactNode } from "react";
import styles from "./Container.module.scss";

interface IContainerProps {
  children: ReactNode;
  className?: string;
}
  
export const Container = ({ children, className }: IContainerProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      { children }
    </div>
  );
}