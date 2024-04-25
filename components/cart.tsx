"use client";

import React, { useState } from "react";
import { BackpackIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import CartSheet from "@/app/(app)/_components/CartSheet";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setOpen(open);
  const { totalItems } = useCart();

  return (
    <>
      <Button
        className="px-1 md:px-4"
        variant="ghost"
        onClick={() => setOpen(true)}
      >
        <BackpackIcon className="h-[1.2rem] w-[1.2rem]" />
        <Badge className=" flex items-center justify-center h-[1.2rem] w-[1.2rem] mb-6 " variant="destructive">
          {totalItems}
        </Badge>
      </Button>
      <CartSheet open={open} onOpenChange={handleOpenChange} />
    </>
  );
};

export default Cart;
