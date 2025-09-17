// API
import { Category } from "../_utils/Api";

// NEXT
import Link from "next/link";
import Image from "next/image";

// REACT
import React from "react";

async function CategoryList({
  categoryList,
  selectedCategory = "none",
}: {
  categoryList: Category[];
  selectedCategory: string;
}) {
  return (
    <div className="mt-5 capitalize">
      <h2 className="text-2xl text-amber-500 font-bold">shop by category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 md:gap-4">
        {categoryList.map((cat, index) => (
          <div
            key={index}
            className={`mt-3 flex flex-col justify-center items-center rounded-xl p-3 group text-center ${
              selectedCategory === cat.name
                ? "bg-amber-400"
                : selectedCategory === "all"
                ? "bg-amber-400"
                : "bg-white"
            }`}
          >
            <Link href={`/product-category/${cat.name}`}>
              <Image
                src={`http://localhost:1337${cat?.icon[0]?.url}`}
                alt="hi"
                width={80}
                height={80}
                unoptimized={true}
                className="h-15 hover:scale-125 transition-all cursor-pointer"
              ></Image>
              <h6
                className={`text-sm font-bold ${
                  selectedCategory === cat.name
                    ? "text-white"
                    : selectedCategory === "all"
                    ? "text-white"
                    : "text-amber-400"
                }
            `}
              >
                {cat.name}
              </h6>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
