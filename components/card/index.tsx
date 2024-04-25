"use client";
import React from "react";
import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import {
  HeartFilledIcon,
  StarFilledIcon,
  ArrowRightIcon,
  BackpackIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useCart } from "@/context/CartContext";
import { useFavorite } from "@/context/FavoriteContext";

interface Props {
  item: IProduct;
}

const Product: React.FC<Props> = ({ item }) => {
  const { addToCart, cart } = useCart();
  const { addToFavorites, removeFromFavorites, favorites } = useFavorite();
  const existingCartItem = cart.find((p) => p.product.id === item.id);

  return (
    <Card data-testid="product-1" className={"lg:w-[400px] sm:w-full"}>
      <CardHeader className="h-[140px]">
        <Link href={`/product/${item.id}`}>
          <CardTitle className="leading-relaxed hover:underline cursor-pointer ">
            {item.title}
          </CardTitle>
        </Link>
        <CardDescription>{item.stock} items in stock left.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="h-[180px]">
          <Image
            src={item.images[0]}
            alt={item.title}
            className="h-full rounded-sm w-full object-contain hover:scale-110 transition duration-300 ease-in "
            width={200}
            height={200}
            priority
          />
        </div>
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <HeartFilledIcon />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Add to Favorites</p>
            <p className="text-sm text-muted-foreground">
              This will be saved in your local device.
            </p>
          </div>
          <Switch
            checked={favorites.some((favorite) => favorite.id === item.id)}
            onCheckedChange={(checked) => {
              if (!checked) {
                removeFromFavorites(item);
              } else {
                addToFavorites(item);
              }
            }}
          />
        </div>
        <div>
          <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none flex gap-2">
                {item.rating.rate.toString()} <StarFilledIcon />
              </p>
              <p className="text-sm text-muted-foreground">
                ({item.rating.count.toString()}) ratings
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none flex gap-2">
                {item.images.length} images
              </p>
              <p className="text-sm text-muted-foreground">
                you can see{" "}
                {item.images.length > 1 ? (
                  <strong>them</strong>
                ) : (
                  <strong>it</strong>
                )}{" "}
                and zoom on it in product detail page
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/product/${item.id}`}>
          <Button variant={"outline"}>
            Goto Item
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(item);
          }}
          data-testid="button-add-to-cart"
        >
          {existingCartItem ? (
            <p>({existingCartItem.quantity}) items Added </p>
          ) : (
            <p>Add To Cart</p>
          )}
          <BackpackIcon className="hidden md:block ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Product;
