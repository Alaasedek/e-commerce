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
import { useCart } from "@/context/CartContext";
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

function CartSheet({ open, onOpenChange }: Props) {
  const {
    cart,
    addToCart,
    removeFromCart,
    removeOneItemFromCart,
    clearCart,
    total,
  } = useCart();

  const openChangeWrapper = (open: boolean) => {
    onOpenChange(open);
  };
  return (
    <Sheet open={open} onOpenChange={openChangeWrapper}>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle className="font-bold">CART</SheetTitle>
          <SheetDescription>
            you can modify your all cart functionality here
          </SheetDescription>
          <Separator />
        </SheetHeader>
        <div className="py-4">
          {cart.length > 0 &&
            cart.map((item) => (
              <Card className="my-4" key={item.product.id}>
                <CardHeader className="h-[100px]">
                  <CardTitle className="leading-relaxed text-sm ">
                    {item.product.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="h-[180px]">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="h-full rounded-sm w-full object-contain"
                      width={200}
                      height={200}
                      priority
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col justify-between gap-2 md:flex-row ">
                  <div className="flex items-center justify-center">
                    <Button
                      variant={"outline"}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeOneItemFromCart(item.product);
                      }}
                    >
                      -
                    </Button>
                    <p className="px-2">{item.quantity}</p>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item.product);
                      }}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant={"outline"}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCart(item.product.id);
                    }}
                  >
                    Remove From Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          <p className="text-xl font-semibold ">Total: ${total.toFixed(2)}</p>
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <Separator />
          <Button
            onClick={(e) => {
              e.stopPropagation();
              clearCart();
            }}
            disabled={cart.length === 0}
            variant={"outline"}
          >
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CartSheet;
