import { queryClient } from "@/libs/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

interface IQueryRouterProps {
  children: ReactNode,
}
  
export const QueryRouter = ({ children }: IQueryRouterProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      { children }
    </QueryClientProvider>
  );
}