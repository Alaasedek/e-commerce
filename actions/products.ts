import { products } from "@/data/products";
import { wait } from "@/lib/wait";

export const getProducts = async () => {
  await wait(3000);
  return products;
};

export const getProductById = async (productId: number) => {
  const allProducts = await getProducts();
  const product = allProducts.find((product) => product.id === productId);
  return product;
};

export const getNextAndPrevProductById = (productId: number) => {
  const allProducts = products;
  const NextProduct = allProducts.find(
    (product) => product.id === productId + 1
  );
  const PrevProduct = allProducts.find(
    (product) => product.id === productId - 1
  );

  return { NextProduct, PrevProduct };
};
