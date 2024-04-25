"use client";

import { useEffect, useState } from "react";
export const useScreenDetector = () => {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 100
  );
  const handleWindowSizeChange = () => {
    setWidth(window?.innerWidth);
  };

  useEffect(() => {
    window?.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window?.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;
  const isTablet = width <= 1024;
  const isDesktop = width > 1024;

  return { isMobile, isTablet, isDesktop };
};
