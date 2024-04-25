"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useCart } from "@/context/CartContext";
import { useFavorite } from "@/context/FavoriteContext";
import { IProduct } from "@/types/product";
import { BackpackIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import NextPrevProducts from "./NextPrevProducts";

const ProductActions = ({ product }: { product: IProduct }) => {
  const { addToCart, cart } = useCart();
  const { addToFavorites, removeFromFavorites, favorites } = useFavorite();
  const existingCartItem = cart.find((p) => p.product.id === product.id);

  return (
    <div className="flex flex-col ">
      <div className=" flex items-center space-x-4 rounded-md border p-4">
        <HeartFilledIcon />
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">Add to Favourite</p>
          <p className="text-sm text-muted-foreground">
            This will be saved in your local device.
          </p>
        </div>
        <Switch
          checked={favorites.some((favorite) => favorite.id === product.id)}
          onCheckedChange={(checked) => {
            if (!checked) {
              removeFromFavorites(product);
            } else {
              addToFavorites(product);
            }
          }}
        />
      </div>
      <div className="mb-4 mr-4 mt-4 lg:mb-0">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          {existingCartItem ? (
            <p>({existingCartItem.quantity}) items Added </p>
          ) : (
            <p>Add To Cart</p>
          )}
          <BackpackIcon className="block ml-2 h-4 w-4" />
        </Button>
      </div>
      <NextPrevProducts id={product.id} />
    </div>
  );
};

export default ProductActions;
