import React from "react";
import Image from "next/image";
import { Product } from "../_utils/Api";
import { Button } from "@/components/ui/button";
import { ProductDetails } from "./ProductDetails";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ProductItem({ product }: { product: Product }) {
  return (
    <>
      <Image
        src={`http://localhost:1337${product?.image[0]?.url}`}
        alt="product"
        width={300}
        height={250}
        unoptimized={true}
        className="h-80 hover:scale-105 transition-all cursor-pointer"
      ></Image>
      <div className="flex flex-col items-center justify-center mt-2 font-bold">
        <p className="text-amber-500">{product.name}</p>
        <p>{product.sellingPrice}$</p>
        <del className="text-red-700">{product.realPrice}$</del>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-2 cursor-pointer">Add to cart</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <ProductDetails product={product} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
