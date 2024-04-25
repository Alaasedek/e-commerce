import { render, screen, fireEvent } from "@testing-library/react";
import Product from "../index";
import { products } from "@/data/products";
import { CartProvider } from "@/context/CartContext";
import { FavoriteProvider } from "@/context/FavoriteContext";

test("should render product component", () => {
  render(
    <CartProvider>
      <FavoriteProvider>
        <Product item={products[0]} />
      </FavoriteProvider>
    </CartProvider>
  );
  expect(screen.getByTestId("product-1")).toBeDefined();
  expect(screen.findByText("Add to Cart")).toBeDefined();

  //   fireEvent.click(screen.getByText("Add to Cart"));
  //   expect(screen.getByText("(1) items Added")).toBeDefined();
});

test("should have Add To Cart button", () => {
  render(
    <CartProvider>
      <FavoriteProvider>
        <Product item={products[0]} />
      </FavoriteProvider>
    </CartProvider>
  );
  expect(screen.getByTestId("button-add-to-cart")).toBeDefined();

  //   fireEvent.click(screen.getByText("Add to Cart"));
  //   expect(screen.getByText("(1) items Added")).toBeDefined();
});

test("can click on Add To Cart button and display 1 item added to cart", () => {
  render(
    <CartProvider>
      <FavoriteProvider>
        <Product item={products[0]} />
      </FavoriteProvider>
    </CartProvider>
  );

  fireEvent.click(screen.getByTestId("button-add-to-cart"));
  expect(screen.findByText("(1) items Added")).toBeDefined();
});

test("can click on Add To Cart button and display 2 item added to cart", () => {
  render(
    <CartProvider>
      <FavoriteProvider>
        <Product item={products[0]} />
      </FavoriteProvider>
    </CartProvider>
  );

  fireEvent.click(screen.getByTestId("button-add-to-cart"));
  expect(screen.findByText("(2) items Added")).toBeDefined();
});
