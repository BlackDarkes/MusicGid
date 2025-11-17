"use client"

import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/libs/queryClient";

interface IQueryRouterProps {
  children: ReactNode;
}
  
export const QueryRouter = ({ children }: IQueryRouterProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      { children }
    </QueryClientProvider>
  );
}