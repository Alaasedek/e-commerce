import { getNextAndPrevProductById } from "@/actions/products";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const NextPrevProducts = ({ id }: { id: number }) => {
  return <Buttons id={id} />;
};

export default NextPrevProducts;

function Buttons({ id }: { id: number }) {
  const { NextProduct, PrevProduct } = getNextAndPrevProductById(Number(id));

  return (
    <div className="flex justify-between mt-10">
      {PrevProduct ? (
        <Link href={`/product/${PrevProduct?.id}`}>
          <Button
            disabled={!PrevProduct}
            onClick={(e) => {
              e.stopPropagation();
            }}
            variant={"outline"}
          >
            <ArrowLeftIcon className="block mr-4 h-4 w-4" />
            previous Product
          </Button>
        </Link>
      ) : (
        <Dim title={"previous Product"} />
      )}
      {NextProduct ? (
        <Link href={`/product/${NextProduct?.id}`}>
          <Button
            disabled={!NextProduct}
            onClick={(e) => {
              e.stopPropagation();
            }}
            variant={"outline"}
          >
            Next Product
            <ArrowRightIcon className="block ml-4 h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <Dim title={"Next Product"} />
      )}
    </div>
  );
}

const Dim = ({ title }: { title: String }) => (
  <Button disabled={true} variant={"outline"}>
    {title}
    <ArrowRightIcon className="block ml-4 h-4 w-4" />
  </Button>
);
