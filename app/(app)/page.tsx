import { Suspense } from "react";
import { getProducts } from "@/actions/products";
import Product from "@/components/card";
import { Alert, AlertTitle } from "@/components/ui/alert";

export default async function Home() {
  return <CollectionList />;
}

async function CollectionList() {
  const collections = await getProducts();

  if (collections.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          <AlertTitle>There are no collections yet!</AlertTitle>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <div
        className="
        grid sm:grid-cols-1 
        lg:grid-cols-2 xl:grid-cols-3
        lg:p-10
        sm:p-5
        p-2
        gap-5 
        max-w-8xl 
        mx-auto 
        mb-10"
      >
        {collections.map((collection) => (
          <Product key={collection.id} item={collection} />
        ))}
      </div>
    </>
  );
}
