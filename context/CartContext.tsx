import { IProduct } from "@/types/product";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface CartItem {
  product: IProduct;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: number) => void;
  removeOneItemFromCart: (product: IProduct) => void;
  clearCart: () => void;
  total: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      localStorage.setItem("cart", "[]");
    }
  }, []);

  useEffect(() => {
    cart.length > 0 && localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: IProduct) => {
    const existingCartItem = cart.find(
      (item) => item.product.id === product.id
    );

    if (existingCartItem) {
      setCart((prevCart) => {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      });
    } else {
      setCart((prevCart) => {
        return [...prevCart, { product, quantity: 1 }];
      });
    }
  };

  const removeOneItemFromCart = (product: IProduct) => {
    const existingCartItem = cart.find(
      (item) => item.product.id === product.id
    );

    if (existingCartItem) {
      if (existingCartItem.quantity === 1) {
        if (cart.length === 1) {
          localStorage.setItem("cart", "[]");
        }
        setCart((prevCart) => {
          return prevCart.filter((item) => item.product.id !== product.id);
        });
      } else {
        setCart((prevCart) => {
          return prevCart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        });
      }
    }
  };

  const removeFromCart = (productId: number) => {
    if (cart.length === 1) {
      localStorage.setItem("cart", "[]");
    }
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.product.id !== productId);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem("cart", "[]");
  };

  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        total,
        removeOneItemFromCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
