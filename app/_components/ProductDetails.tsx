"use client";
import React, { useState } from "react";

import { Product } from "../_utils/Api";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

export function ProductDetails({ product }: { product: Product }) {
  const [totalSellingPrice] = useState(
    product.sellingPrice ? product.sellingPrice : product.realPrice
  );
  const [category, setCategory] = useState(1);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-center items-center">
      <Image
        src={`http://localhost:1337${product?.image[0]?.url}`}
        alt="product-desctiption"
        width={300}
        height={300}
        className=" h-full"
      ></Image>
      <div className="flex flex-col text-3xl text-gray-500 gap-2 capitalize">
        <DialogTitle>Add the item</DialogTitle>
        <h1 className="text-2xl">{product.name}</h1>
        <p className="text-sm">{product.description}</p>
        <div className="flex gap-4">
          <h2 className="text-xl">{product.sellingPrice}$</h2>
          <del className="text-red-700 text-xl">{product.realPrice}$</del>
        </div>
        <div className="flex flex-col justify-center items-baseline gap-2">
          <div className="flex gap-2 border ">
            <button
              className="px-8"
              disabled={category === 1}
              onClick={() => setCategory(category - 1)}
            >
              -
            </button>
            <h2>{category}</h2>
            <button className="px-8" onClick={() => setCategory(category + 1)}>
              +
            </button>
          </div>
          <h1 className="text-2xl font-bold">
            {(totalSellingPrice * category).toFixed(2)}$
          </h1>
          <Button className="text-black">
            <ShoppingBasket /> Add to Cart!
          </Button>
        </div>
        <h2 className="text-sm text-amber-500">
          category:
          {product.categories.map((cat) => (
            <span key={cat.id} className="text-gray-500">
              {cat.name}
            </span>
          ))}
        </h2>
      </div>
    </div>
  );
}
