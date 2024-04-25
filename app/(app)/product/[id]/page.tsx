import { getProductById } from "@/actions/products";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import Gallery from "./_components/Gallery";
import ProductActions from "./_components/ProductActions";

export default async function ProductPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  return (
    <>
      <Suspense fallback={<WaitFallback />}>
        <CollectionList id={id} />
      </Suspense>
    </>
  );
}

function WaitFallback() {
  return (
    <div className=" mx-auto mt-10">
      <h1 className="text-4xl font-bold">
        <Skeleton className="w-[250px]  md:w-[800px] h-[100px] mb-10" />
        <Skeleton className="w-[250px]  md:w-[800px] h-[100px] mb-10" />
        <Skeleton className="w-[250px]  md:w-[800px] h-[100px] mb-10" />
        <Skeleton className="w-[250px]  md:w-[800px] h-[100px]" />
      </h1>
    </div>
  );
}

async function CollectionList({ id }: { id: string }) {
  const product = await getProductById(Number(id));

  return (
    <>
      {product ? (
        <section className=" mx-auto overflow-hidden ">
          <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
            <div className="flex flex-wrap -mx-4">
              <Gallery product={product} />
              <div className="w-full py-8 px-4 md:w-1/2 ">
                <div className="lg:pl-20">
                  <div className="pb-6 mb-8 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="max-w-xl mt-2 mb-6 text-xl font-bold dark:text-gray-300 md:text-4xl">
                      {product.title}
                    </h2>
                    <h4 className="max-w-xl mt-2 mb-6 text-xl/3 dark:text-gray-300 md:text-xl">
                      <strong>category: </strong>
                      {product.category}
                    </h4>
                    <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                      {product.description}
                    </p>
                    <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                      <span>${product.price}</span>
                    </p>
                    <p className="max-w-md  text-gray-700 dark:text-gray-400">
                      <strong>({product.rating.rate})</strong> ratings from{" "}
                      <strong>{product.rating.count}</strong> people
                    </p>
                  </div>
                  <ProductActions product={product} />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex w-full h-full flex-col items-center justify-center gap-4">
          <h2 className="text-destructive text-4xl">Something went wrong!</h2>
          <Button asChild>
            <Link href={"/"}>Go back to home</Link>
          </Button>
        </div>
      )}
    </>
  );
}
