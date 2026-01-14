import type { ReactNode } from "react";

interface IContainerProps {
  children: ReactNode;
  className?: string;
}
  
export const Container = ({ className, children }: IContainerProps) => {
  return (
    <div className={`mx-auto w-[min(100%-40px,1440px)] ${className ? className : ""}`}>
      { children }
    </div>
  );
}