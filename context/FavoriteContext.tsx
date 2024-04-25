"use client";

import { IProduct } from "@/types/product";
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

interface FavoriteContextType {
  favorites: IProduct[];
  addToFavorites: (item: IProduct) => void;
  removeFromFavorites: (item: IProduct) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<IProduct[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    } else {
      localStorage.setItem("favorites", "[]");
    }
  }, []);

  useEffect(() => {
    favorites.length > 0 &&
      localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (item: IProduct) => {
    if (!favorites.some((favorite) => favorite.id === item.id)) {
      setFavorites([...favorites, item]);
    }
  };

  const removeFromFavorites = (item: IProduct) => {
    if (favorites.length === 1) {
      localStorage.setItem("favorites", "[]");
    }
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== item.id
    );
    setFavorites(updatedFavorites);
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
};
