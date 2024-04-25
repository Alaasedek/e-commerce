import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useFavorite } from "@/context/FavoriteContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function FavoritesSheet({ open, onOpenChange }: Props) {
  const { favorites, removeFromFavorites } = useFavorite();

  const openChangeWrapper = (open: boolean) => {
    onOpenChange(open);
  };
  return (
    <Sheet open={open} onOpenChange={openChangeWrapper}>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>FAVORITES</SheetTitle>
          <SheetDescription>
            you can modify your all Favorites functionality here
          </SheetDescription>
        </SheetHeader>
        <div>
          {favorites.length > 0 &&
            favorites.map((item) => (
              <Card className="my-4" key={item.id}>
                <CardHeader className="h-[100px]">
                  <CardTitle className="leading-relaxed text-sm ">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="h-[180px]">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      className="h-full rounded-sm w-full object-contain"
                      width={200}
                      height={200}
                      priority
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col justify-center gap-2 md:flex-row ">
                  <Button
                    variant={"outline"}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromFavorites(item);
                    }}
                  >
                    Remove From Favorites
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <Separator />
          <Button variant={"outline"}>Move all to cart</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default FavoritesSheet;
