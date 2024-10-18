"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { GlobalContextProvider } from "@/app/context/globalContext";

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider {...props}>
      <GlobalContextProvider>{children}</GlobalContextProvider>
    </NextThemesProvider>
  );
}
