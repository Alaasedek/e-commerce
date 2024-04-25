"use client";

import React, { useState } from "react";
import { StarIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import FavoritesSheet from "@/app/(app)/_components/FavSheet";
import { useFavorite } from "@/context/FavoriteContext";

const Favorites = () => {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setOpen(open);
  const { favorites } = useFavorite();

  return (
    <div>
      <Button
        className="px-1 md:px-4"
        variant="ghost"
        onClick={() => setOpen(true)}
      >
        <StarIcon className="h-[1.2rem] w-[1.2rem]" />
        <Badge
          className=" flex items-center justify-center h-[1.2rem] w-[1.2rem] mb-6 "
          variant="destructive"
        >
          {favorites.length}
        </Badge>
      </Button>
      <FavoritesSheet open={open} onOpenChange={handleOpenChange} />
    </div>
  );
};

export default Favorites;
