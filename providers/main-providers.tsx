"use client";

import { CartProvider } from "@/context/CartContext";
import { FavoriteProvider } from "@/context/FavoriteContext";
import React, { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";

export const MainProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CartProvider>
        <FavoriteProvider>{children}</FavoriteProvider>
      </CartProvider>
    </ThemeProvider>
  );
};
